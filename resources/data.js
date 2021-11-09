import * as api from './api.js';

export default function (language) {
	// Shorthand for the labels
	const l = language.label;

	//  Get the data from the API
	api.getData().then((data) => {
		// The total variables
		let totalPopulation = 0;
		let totalCovidCases = 0;
		let totalCovidHosp = 0;
		let totalCovidDeath = 0;
		let totalVacc = 0;
		let totalVacHosp = 0;
		let totalVacDeath = 0;

		// Reset the data
		document.querySelector('.results-years').innerHTML = '';

		// Create the table for the total data
		let table = createElement('table', 'results__table table table-striped table-responsive', '', document.querySelector('.results-years'));

		// Build the head section
		let row = createElement('tr', '', '', createElement('thead', '', '', table));
		createElement('td', '', l.type, row);
		createElement('td', 'data-cell', l.total, row);

		// Build the totals
		data.years['covid'].forEach((year) => {
			totalCovidCases += year.cases;
			totalCovidHosp += year.hosp;
			totalCovidDeath += year.death;

			// Create the header cell for the year
			createElement('td', 'data-cell', year.year, row);
		});
		data.years['vacc'].forEach((year) => {
			totalVacc += year.vaccinated;
			totalVacHosp += year.hosp;
			totalVacDeath += year.death;
		});

		// Build the body
		const body = createElement('tbody', '', '', table);

		row = createElement('tr', '', '', body);
		createElement('td', '', l.corona_cases, row);
		createElement('td', 'data-cell', format(totalCovidCases), row);
		data.years['covid'].forEach((year) => createElement('td', 'data-cell', format(year.cases), row));

		row = createElement('tr', '', '', body);
		createElement('td', '', l.corona_hospitalization, row);
		createElement('td', 'data-cell', format(totalCovidHosp), row);
		data.years['covid'].forEach((year) => createElement('td', 'data-cell', format(year.hosp), row));

		row = createElement('tr', '', '', body);
		createElement('td', '', l.corona_deaths, row);
		createElement('td', 'data-cell', format(totalCovidDeath), row);
		data.years['covid'].forEach((year) => createElement('td', 'data-cell', format(year.death), row));

		row = createElement('tr', '', '', body);
		createElement('td', '', l.vaccinated, row);
		createElement('td', 'data-cell', format(totalVacc), row);
		data.years['vacc'].forEach((year) => createElement('td', 'data-cell', format(year.vaccinated), row));

		row = createElement('tr', '', '', body);
		createElement('td', '', l.vaccinated_hospitalization, row);
		createElement('td', 'data-cell', format(totalVacHosp), row);
		data.years['vacc'].forEach((year) => createElement('td', 'data-cell', format(year.hosp), row));

		row = createElement('tr', '', '', body);
		createElement('td', '', l.vaccinated_deaths, row);
		createElement('td', 'data-cell', format(totalVacDeath), row);
		data.years['vacc'].forEach((year) => createElement('td', 'data-cell', format(year.death), row));

		// Reset the totals
		totalCovidCases = 0;
		totalCovidHosp = 0;
		totalCovidDeath = 0;
		totalVacc = 0;
		totalVacHosp = 0;
		totalVacDeath = 0;

		// The root node for the ages boxes
		const parent = document.querySelector('.results-ages');

		// Reset the content
		parent.innerHTML = '';

		// The sections with tables
		const sections = {};

		// Build the totals from the stats
		data.stats['covid'].forEach((group) => {
			totalPopulation += group.pop;
			totalCovidCases += group.cases;
			totalCovidHosp += group.hosp;
			totalCovidDeath += group.death;

			// Populate the ranges
			if (sections[group.range] === undefined) {
				const section = createElement('section', 'result col-lg-6', '', parent);
				createElement('h3', 'result__heading', group.range != 'Unbekannt' ? group.range + ' ' + l.years : l.unknown, section);

				sections[group.range] = createElement('table', 'table table-borderless border', '', section);
			}
		});
		data.stats['vacc'].forEach((group) => {
			totalVacc += group.vaccinated;
			totalVacHosp += group.hosp;
			totalVacDeath += group.death;
		});

		// Loop over each age group
		data.stats['covid'].forEach((group) => {
			let row = createElement('tr', '', '', sections[group.range]);
			createElement('td', '', l.population + ':', row);
			createElement('td', 'data-cell', format(group.pop), row);
			createElement('td', 'data-cell', ((100 / totalPopulation) * group.pop).toFixed(3) + '%', row);

			row = createElement('tr', '', '', sections[group.range]);
			createElement('td', '', l.corona_cases + ':', row);
			createElement('td', 'data-cell', format(group.cases), row);
			createElement('td', 'data-cell', ((100 / totalCovidCases) * group.cases).toFixed(3) + '%', row);

			row = createElement('tr', '', '', sections[group.range]);
			createElement('td', '', l.corona_hospitalization + ':', row);
			createElement('td', 'data-cell', format(group.hosp), row);
			createElement('td', 'data-cell', ((100 / totalCovidHosp) * group.hosp).toFixed(3) + '%', row);

			row = createElement('tr', '', '', sections[group.range]);
			createElement('td', '', l.corona_deaths + ':', row);
			createElement('td', 'data-cell', format(group.death), row);
			createElement('td', 'data-cell', ((100 / totalCovidDeath) * group.death).toFixed(3) + '%', row);
		});
		data.stats['vacc'].forEach((group) => {
			let row = createElement('tr', '', '', sections[group.range]);
			createElement('td', '', l.vaccinated + ':', row);
			createElement('td', 'data-cell', format(group.vaccinated), row);
			createElement('td', 'data-cell', ((100 / totalVacc) * group.vaccinated).toFixed(3) + '%', row);

			row = createElement('tr', '', '', sections[group.range]);
			createElement('td', '', l.vaccinated_hospitalization + ':', row);
			createElement('td', 'data-cell', format(group.hosp), row);
			createElement('td', 'data-cell', ((100 / totalVacHosp) * group.hosp).toFixed(3) + '%', row);

			row = createElement('tr', '', '', sections[group.range]);
			createElement('td', '', l.vaccinated_deaths + ':', row);
			createElement('td', 'data-cell', format(group.death), row);
			createElement('td', 'data-cell', ((100 / totalVacDeath) * group.death).toFixed(3) + '%', row);
		});
		data.stats['covid'].forEach((group) => {
			let row = createElement('tr', '', '', sections[group.range]);
			createElement('td', '', l.cases_to_hospitalization + ':', row);
			createElement('td', 'data-cell', format(group.cases) + ' / ' + format(group.hosp), row);
			createElement('td', 'data-cell', ((100 / group.cases) * group.hosp).toFixed(3) + '%', row);

			row = createElement('tr', '', '', sections[group.range]);
			createElement('td', '', l.cases_to_deaths + ':', row);
			createElement('td', 'data-cell', format(group.cases) + ' / ' + format(group.death), row);
			createElement('td', 'data-cell', ((100 / group.cases) * group.death).toFixed(3) + '%', row);
		});
		data.stats['vacc'].forEach((group) => {
			let row = createElement('tr', '', '', sections[group.range]);
			createElement('td', '', l.population_to_vaccinated + ':', row);
			createElement('td', 'data-cell', format(group.pop) + ' / ' + format(group.vaccinated), row);
			createElement('td', 'data-cell', (group.pop === 0 ? 0 : ((100 / group.pop) * group.vaccinated).toFixed(3)) + '%', row);
		});

		// Set the population
		document.querySelector('.population').innerHTML = format(totalPopulation);

		// Set the date
		const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
		document.querySelector('.update_date').innerHTML = (new Date(data.date.start)).toLocaleString('de-DE', options)
			+ ' - ' + (new Date(data.date.end)).toLocaleString('de-DE', options);
	});
}

/**
 * Creates a HTMLElement for the given type under the given parent with class and content.
 *
 * @param string type
 * @param string classes
 * @param string content
 * @param HTMLElement parent
 *
 * @returns HTMLElement
 */
function createElement(type, classes, content, parent) {
	const element = document.createElement(type);
	element.className = classes;
	element.innerHTML = content;
	parent.appendChild(element);

	return element;
}

/**
 * Formats the given number with single quotes as thousand delimiter.
 *
 * @param Number number
 * @returns string
 */
function format(number) {
	// Check if it is really a number
	if (isNaN(number)) {
		return '0';
	}
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'");
}
