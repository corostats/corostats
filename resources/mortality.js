import * as api from './api.js';
import { Chart, LineElement, PointElement, LineController, CategoryScale, LinearScale, Filler, Legend, Tooltip } from 'chart.js';

let chart;

export default function (language) {
	// Delete existing chart
	if (chart) {
		chart.destroy();
	}

	// Shorthand for the labels
	const l = language.label;

	// register the components
	Chart.register(LineElement, PointElement, LineController, CategoryScale, LinearScale, Filler, Legend, Tooltip);

	// Build the data
	api.getMortality().then((data) => {
		// The data holder object
		const stats = {
			till64: [],
			minTill64: [],
			maxTill64: [],
			from65: [],
			minFrom65: [],
			maxFrom65: [],
			date: []
		}

		// Loop over the stats and build the data arrays for the chart
		data.stats.forEach((stat) => {
			if (stat.age === '0 - 64') {
				const date = new Date(stat.date);
				stats.date.push(date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear());
				stats.till64.push(stat.value);
				stats.minTill64.push(stat.min);
				stats.maxTill64.push(stat.max);
			}
			if (stat.age === '65+') {
				stats.from65.push(stat.value);
				stats.minFrom65.push(stat.min);
				stats.maxFrom65.push(stat.max);
			}
		});

		// The chart object
		chart = new Chart(document.querySelector('.mortality-chart'), {
			type: 'line',
			data: {
				labels: stats.date,
				datasets: [
					{
						label: '0 - 64',
						data: stats.till64,
						borderColor: 'rgba(54, 162, 235, 1)',
						backgroundColor: 'rgba(54, 162, 235, 1)',
						tension: 0.4,
						pointRadius: 0
					},
					{
						label: '65+',
						data: stats.from65,
						borderColor: 'rgba(226, 128, 2, 1)',
						backgroundColor: 'rgba(226, 128, 2, 1)',
						tension: 0.4,
						pointRadius: 0
					},
					{
						label: l.limit_range,
						data: stats.minTill64,
						borderColor: 'rgba(201, 201, 201, 0.5)',
						backgroundColor: 'rgba(201, 201, 201, 1)',
						tension: 0.4,
						pointRadius: 0
					},
					{
						label: '',
						data: stats.maxTill64,
						borderColor: 'rgba(201, 201, 201, 0.5)',
						backgroundColor: 'rgba(201, 201, 201, 1)',
						fill: '-1',
						tension: 0.4,
						pointRadius: 0
					},
					{
						label: '',
						data: stats.minFrom65,
						borderColor: 'rgba(201, 201, 201, 0.5)',
						backgroundColor: 'rgba(201, 201, 201, 1)',
						tension: 0.4,
						pointRadius: 0
					},
					{
						label: '',
						data: stats.maxFrom65,
						borderColor: 'rgba(201, 201, 201, 0.5)',
						backgroundColor: 'rgba(201, 201, 201, 1)',
						fill: '-1',
						tension: 0.4,
						pointRadius: 0
					},
				]
			},
			options: {
				maintainAspectRatio: false,
				plugins: {
					legend: {
						labels: {
							filter: (label) => label.text.length > 0
						}
					}
				}
			}
		});
	});
}
