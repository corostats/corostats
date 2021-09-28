const fs = require('fs');
const request = require('sync-request');

// Create the folders when the don't exist
if (!fs.existsSync(__dirname + '/tmp')) {
	fs.mkdirSync(__dirname + '/tmp');
}
if (!fs.existsSync(__dirname + '/../assets')) {
	fs.mkdirSync(__dirname + '/../assets');
}

// Fetch the most recent version of the data
const version = JSON.parse(request('GET', 'https://www.covid19.admin.ch/api/data/context').getBody('utf8')).dataVersion;

// The data
const data = [
	{ range: '0 - 9', cases: 0, hosp: 0, death: 0 },
	{ range: '10 - 19', cases: 0, hosp: 0, death: 0 },
	{ range: '20 - 29', cases: 0, hosp: 0, death: 0 },
	{ range: '30 - 39', cases: 0, hosp: 0, death: 0 },
	{ range: '40 - 49', cases: 0, hosp: 0, death: 0 },
	{ range: '50 - 59', cases: 0, hosp: 0, death: 0 },
	{ range: '60 - 69', cases: 0, hosp: 0, death: 0 },
	{ range: '70 - 79', cases: 0, hosp: 0, death: 0 },
	{ range: '80+', cases: 0, hosp: 0, death: 0 },
	{ range: 'Unbekannt', cases: 0, hosp: 0, death: 0 }
];

// The years
const years = [
	{ year: '2020', cases: 0, hosp: 0, death: 0 },
	{ year: '2021', cases: 0, hosp: 0, death: 0 }
];

// The last datum entry where the data is fetched from
let date = { start: null, end: null };
const read = (name) => {
	console.log('Fetching data for ' + name);

	// Get the data source
	fs.writeFileSync(
		__dirname + '/tmp/' + name + '.json',
		request('GET', 'https://www.covid19.admin.ch/api/data/' + version + '/sources/COVID19' + name.charAt(0).toUpperCase() + name.slice(1) + '_geoRegion_AKL10_w.json').getBody('utf8')
	);

	const entries = JSON.parse(fs.readFileSync(__dirname + '/tmp/' + name + '.json'));
	console.log('Found ' + entries.length + ' entries');

	// Read the data
	entries.forEach((stat) => {
		// Only use the data from Switzerland
		if (stat.geoRegion !== 'CH') {
			return;
		}

		// Set the first date
		if (date.start === null) {
			date.start = stat.datum;
		}

		// Find the group and add the entries
		const group = data.find((set) => set.range === stat.altersklasse_covid19);
		if (typeof group === 'object') {
			group[name] += stat.entries;
		}

		// Find the year and add the entries
		const year = years.find((set) => set.year === stat.datum.toString().substring(0, 4));
		if (typeof year === 'object') {
			year[name] += stat.entries;
		}

		// Set the actual datum as last date
		date.end = stat.datum;
	});

	console.log('Finished to build data for ' + name);
};

// Build the data
read('cases');
read('hosp');
read('death');

// Transform year and week numbers into iso strings
date.start = date.start.toString();
date.start = (new Date(date.start.substring(0, 4), 0, (date.start.substring(4) * 7) - 8)).toISOString();
date.end = date.end.toString();
date.end = (new Date(date.end.substring(0, 4), 0, 1 + date.end.substring(4) * 7)).toISOString();

// Write the cumulated data to disk
fs.writeFileSync(__dirname + '/../assets/data.json', JSON.stringify({ stats: data, years: years, date: date }));
console.log('Finished to build data, wrote it to the file ' + __dirname + '/../assets/data.json');
