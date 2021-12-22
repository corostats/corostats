const fs = require('fs');
const request = require('sync-request');

// Create the folders when the don't exist
if (!fs.existsSync(__dirname + '/tmp')) {
	fs.mkdirSync(__dirname + '/tmp');
}
if (!fs.existsSync(__dirname + '/../assets')) {
	fs.mkdirSync(__dirname + '/../assets');
}

// Use this flag to turn off downloading the stats online, for development purposes only.
// Make sure that the files exist in the tmp folder when this flag is set to false.
const download = true;

// The data with groups
let data = {
	covid:
		[
			{ range: '0 - 9', cases: 0, hosp: 0, death: 0, pop: 0 },
			{ range: '10 - 19', cases: 0, hosp: 0, death: 0, pop: 0 },
			{ range: '20 - 29', cases: 0, hosp: 0, death: 0, pop: 0 },
			{ range: '30 - 39', cases: 0, hosp: 0, death: 0, pop: 0 },
			{ range: '40 - 49', cases: 0, hosp: 0, death: 0, pop: 0 },
			{ range: '50 - 59', cases: 0, hosp: 0, death: 0, pop: 0 },
			{ range: '60 - 69', cases: 0, hosp: 0, death: 0, pop: 0 },
			{ range: '70 - 79', cases: 0, hosp: 0, death: 0, pop: 0 },
			{ range: '80+', cases: 0, hosp: 0, death: 0, pop: 0 },
			{ range: 'Unbekannt', cases: 0, hosp: 0, death: 0, pop: 0 }
		],
	vacc:
		[
			{ range: '0 - 9', vaccinated: 0 },
			{ range: '10 - 19', vaccinated: 0, pop: 0 },
			{ range: '20 - 29', vaccinated: 0, pop: 0 },
			{ range: '30 - 39', vaccinated: 0, pop: 0 },
			{ range: '40 - 49', vaccinated: 0, pop: 0 },
			{ range: '50 - 59', vaccinated: 0, pop: 0 },
			{ range: '60 - 69', vaccinated: 0, pop: 0 },
			{ range: '70 - 79', vaccinated: 0, pop: 0 },
			{ range: '80+', vaccinated: 0, pop: 0 },
			{ range: 'Unbekannt', vaccinated: 0, pop: 0 }
		]
};

// The years
const years = { covid: [], vacc: [] };

// Fetch the most recent version of the data
const version = download ? JSON.parse(request('GET', 'https://www.covid19.admin.ch/api/data/context').getBody('utf8')).dataVersion : 0;

// The last datum entry where the data is fetched from
let date = { start: null, end: null };
const read = (name, group, type, fileName) => {
	console.log('Fetching data for ' + name + ' of group ' + group);

	// Get the data source
	if (download) {
		fs.writeFileSync(
			__dirname + '/tmp/' + name + '-' + group + '.json',
			request('GET', 'https://www.covid19.admin.ch/api/data/' + version + '/sources/COVID19' + fileName + '.json').getBody('utf8')
		);
	}

	const entries = JSON.parse(fs.readFileSync(__dirname + '/tmp/' + name + '-' + group + '.json'));
	console.log('Found ' + entries.length + ' entries');

	// Read the data
	entries.forEach((stat) => {
		// Only use the data from Switzerland
		if (stat.geoRegion !== 'CH' || type !== stat.type) {
			return;
		}

		// Set the first date
		if (date.start === null && stat.datum) {
			date.start = stat.datum;
		}
		if (date.start === null && stat.date) {
			date.start = stat.date;
		}

		// Find the group and add the entries
		const dataGroup = data[group].find((set) => set.range === stat.altersklasse_covid19);
		if (typeof dataGroup === 'object' && !isNaN(stat.entries) && stat.entries !== null) {
			dataGroup[name] += stat.entries;

			// Population is always the full number, so nothing to summarize
			if (stat.pop !== undefined) {
				dataGroup.pop = stat.pop;
			}
		}

		// Find the year and add the entries
		const yearNumber = (stat.datum ? stat.datum : stat.date).toString().substring(0, 4);
		let year = years[group].find((set) => set.year === yearNumber);

		// Add year entry
		if (typeof year !== 'object') {
			years.covid.push({ year: yearNumber, cases: 0, hosp: 0, death: 0 });
			years.vacc.push({ year: yearNumber, vaccinated: 0 });
			year = years[group].find((set) => set.year === yearNumber);
		}

		if (!isNaN(stat.entries) && stat.entries !== null) {
			year[name] += stat.entries;
		}

		// Set the actual datum as last date
		date.end = stat.datum ? stat.datum : stat.date;
	});

	console.log('Finished to build data for ' + name + ' of group ' + group);
};

// Build the data
read('cases', 'covid', 'COVID19Cases', 'Cases_geoRegion_AKL10_w');
read('hosp', 'covid', 'COVID19Hosp', 'Hosp_geoRegion_AKL10_w');
read('death', 'covid', 'COVID19Death', 'Death_geoRegion_AKL10_w');
read('vaccinated', 'vacc', 'COVID19FullyVaccPersons', 'VaccPersons_AKL10_w_v2');

// Transform year and week numbers into iso strings
date.start = date.start.toString();
date.start = (new Date(date.start.substring(0, 4), 0, (date.start.substring(4) * 7) - 8)).toISOString();
date.end = date.end.toString();
date.end = (new Date(date.end.substring(0, 4), 0, 1 + date.end.substring(4) * 7)).toISOString();

// Write the cumulated data to disk
fs.writeFileSync(__dirname + '/../assets/stats.json', JSON.stringify({ stats: data, years: years, date: date }));
console.log('Finished to build data, wrote it to the file ' + __dirname + '/../assets/data.json');

console.log('Started to build the mortality data');

// Download the mortality stats
if (download) {
	fs.writeFileSync(
		__dirname + '/tmp/mortality_2010-2019.csv',
		request('GET', 'https://www.bfs.admin.ch/bfsstatic/dam/assets/12607335/master').getBody('utf8')
	);
	fs.writeFileSync(
		__dirname + '/tmp/mortality_2020-2021.csv',
		request('GET', 'https://www.bfs.admin.ch/bfsstatic/dam/assets/19184445/master').getBody('utf8')
	);
}

// Setup the data
date = { start: null, end: null };
data = [];

// Read the stats for the given date range
const readCSV = (range) => {
	// Read the file and split per line
	fs.readFileSync(__dirname + '/tmp/mortality_' + range + '.csv', 'utf-8').split(/\r\n|\n/).forEach((line, index) => {
		// Ignore first, empty and lines with comments
		if (index === 0 || line.length < 1 || line.indexOf('#') === 0) {
			return;
		}

		// Get the values
		const values = line.split(';');

		// Future estimations have a dot as value
		if (values[4].trim() === '.') {
			return;
		}

		// Compile the date
		const parts = values[2].trim().split('.');
		date.end = parts[2] + '-' + parts[1] + '-' + parts[0];

		// Push the data
		data.push({
			date: date.end,
			age: values[3].trim() === '65+' ? '65+' : '0 - 64',
			value: parseInt(values[4].trim()),
			min: parseInt(values[6].trim()),
			max: parseInt(values[7].trim())
		});

		// Create the end date
		if (date.start === null) {
			date.start = date.end;
		}
	});
}

// Parse the files and load the data
readCSV('2010-2019');
readCSV('2020-2021');

// Write the data file
fs.writeFileSync(__dirname + '/../assets/mortality.json', JSON.stringify({ stats: data, date: date }));

console.log('Finished to build the mortality data');
