import * as api from './api.js';

export default function (language) {
	// Shorthand for the labels
	const l = language.label;

	//  Get the data from the API
	api.getData().then((data) => {
		// The total variables
		let totalCases = 0;
		let totalHosp = 0;
		let totalDeath = 0;

		// Reset the data
		document.querySelector('.results-years').innerHTML = '';

		// Create the table for the total data
		const table = createElement('table', 'results__table table table-striped table-responsive', '', document.querySelector('.results-years'));

		// Build the head section
		let row = createElement('tr', '', '', createElement('thead', '', '', table));
		createElement('td', '', l.type, row);
		createElement('td', 'data-cell', l.total, row);

		// Build the totals
		data.years.forEach((year) => {
			totalCases += year.cases;
			totalHosp += year.hosp;
			totalDeath += year.death;

			// Create the header cell for the year
			createElement('td', 'data-cell', year.year, row);
		});

		// Build the body
		const body = createElement('tbody', '', '', table);
		row = createElement('tr', '', '', body);
		createElement('td', '', l.cases, row);
		createElement('td', 'data-cell', format(totalCases), row);
		data.years.forEach((year) => createElement('td', 'data-cell', format(year.cases), row));

		row = createElement('tr', '', '', body);
		createElement('td', '', l.hospitalization, row);
		createElement('td', 'data-cell', format(totalHosp), row);
		data.years.forEach((year) => createElement('td', 'data-cell', format(year.hosp), row));

		row = createElement('tr', '', '', body);
		createElement('td', '', l.deaths, row);
		createElement('td', 'data-cell', format(totalDeath), row);
		data.years.forEach((year) => createElement('td', 'data-cell', format(year.death), row));

		// Reset the totals
		totalCases = 0;
		totalHosp = 0;
		totalDeath = 0;

		// BUild the totals from the stats
		data.stats.forEach((group) => {
			totalCases += group.cases;
			totalHosp += group.hosp;
			totalDeath += group.death;
		});

		// The root node for the ages boxes
		const parent = document.querySelector('.results_ages');

		// Reset the content
		parent.innerHTML = '';

		// Loop over each age group
		data.stats.forEach((group) => {
			const section = createElement('section', 'result col-lg-6', '', parent);
			createElement('h3', 'result__heading', group.range != 'Unbekannt' ? group.range + ' ' + l.years : l.unknown, section);

			const table = createElement('table', 'table border', '', section);

			let row = createElement('tr', '', '', table);
			createElement('td', '', l.cases + ':', row);
			createElement('td', 'data-cell', format(group.cases), row);
			createElement('td', 'data-cell', ((100 / totalCases) * group.cases).toFixed(3) + '%', row);

			row = createElement('tr', '', '', table);
			createElement('td', '', l.hospitalization + ':', row);
			createElement('td', 'data-cell', format(group.hosp), row);
			createElement('td', 'data-cell', ((100 / totalHosp) * group.hosp).toFixed(3) + '%', row);

			row = createElement('tr', '', '', table);
			createElement('td', '', l.deaths + ':', row);
			createElement('td', 'data-cell', format(group.death), row);
			createElement('td', 'data-cell', ((100 / totalDeath) * group.death).toFixed(3) + '%', row);

			row = createElement('tr', '', '', table);
			createElement('td', '', l.cases_to_hospitalization + ':', row);
			createElement('td', 'data-cell', format(group.cases) + ' / ' + format(group.hosp), row);
			createElement('td', 'data-cell', ((100 / group.cases) * group.hosp).toFixed(3) + '%', row);

			row = createElement('tr', '', '', table);
			createElement('td', '', l.cases_to_deaths + ':', row);
			createElement('td', 'data-cell', format(group.cases) + ' / ' + format(group.death), row);
			createElement('td', 'data-cell', ((100 / group.cases) * group.death).toFixed(3) + '%', row);
		});

		// Set the date
		document.querySelector('.update_date').innerHTML = data.date.substring(0, 10);
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
 * @param Number number
 * @returns string
 */
function format(number) {
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'");
}
