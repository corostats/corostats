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

const read = (name) => {
	// Get the data source
	fs.writeFileSync(
		__dirname + '/tmp/' + name + '.json',
		request('GET', 'https://www.covid19.admin.ch/api/data/' + version + '/sources/COVID19' + name.charAt(0).toUpperCase() + name.slice(1) + '_geoRegion_AKL10_w.json').getBody('utf8')
	);

	// Read the data
	JSON.parse(fs.readFileSync(__dirname + '/tmp/' + name + '.json')).forEach((stat) => {
		// Only use the data from Switzerland
		if (stat.geoRegion !== 'CH') {
			return;
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
	});
};

// Build the data
read('cases');
read('hosp');
read('death');

// Write the cumulated data to disk
fs.writeFileSync(__dirname + '/../assets/data.json', JSON.stringify({ stats: data, years: years, date: (new Date()).toISOString() }));
