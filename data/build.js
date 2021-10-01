const fs = require('fs');
const request = require('sync-request');

// Create the folders when the don't exist
if (!fs.existsSync(__dirname + '/tmp')) {
	fs.mkdirSync(__dirname + '/tmp');
}
if (!fs.existsSync(__dirname + '/../assets')) {
	fs.mkdirSync(__dirname + '/../assets');
}

// The data with groups
const data = {
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
const years = {
	covid:
		[
			{ year: '2020', cases: 0, hosp: 0, death: 0 },
			{ year: '2021', cases: 0, hosp: 0, death: 0 }
		],
	vacc:
		[
			{ year: '2020', vaccinated: 0 },
			{ year: '2021', vaccinated: 0 }
		]
};

// Fetch the most recent version of the data
const version = JSON.parse(request('GET', 'https://www.covid19.admin.ch/api/data/context').getBody('utf8')).dataVersion;

// The last datum entry where the data is fetched from
let date = { start: null, end: null };
const read = (name, group, type, fileName) => {
	console.log('Fetching data for ' + name + ' of group ' + group);

	// Get the data source
	fs.writeFileSync(
		__dirname + '/tmp/' + name + '-' + group + '.json',
		request('GET', 'https://www.covid19.admin.ch/api/data/' + version + '/sources/COVID19' + fileName + '.json').getBody('utf8')
	);

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
		if (typeof dataGroup === 'object') {
			dataGroup[name] += stat.entries;

			// Population is always the full number, so nothing to summarize
			if (stat.pop !== undefined) {
				dataGroup.pop = stat.pop;
			}
		}

		// Find the year and add the entries
		const year = years[group].find((set) => set.year === (stat.datum ? stat.datum : stat.date).toString().substring(0, 4));
		if (dataGroup !== undefined && typeof year === 'object') {
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
fs.writeFileSync(__dirname + '/../assets/data.json', JSON.stringify({ stats: data, years: years, date: date }));
console.log('Finished to build data, wrote it to the file ' + __dirname + '/../assets/data.json');
