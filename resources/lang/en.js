export default {
	title: "Corona age statistics for Switzerland",
	timespan: "The Swiss Federal Office of Public Health publishes the numbers till the past weeks. The data which is used on this site is from <span class=\"update_date\"></span>. The population is also extracted from the statistics and is actually <span class=\"population\"></span> people.",
	intro: "This site makes the Corona stats from <a href=\"https://www.bag.admin.ch\" target=\"_blank\" rel=\"noreferrer\">Federal Office of Public Health (FOPH also BAG called)</a> easy readable. The following data is fetched from the <a href=\"https://opendata.swiss/en/dataset/covid-19-schweiz\"  target=\"_blank\" rel=\"noreferrer\">official Swiss government open data hub</a> and is freely available for everybody.",
	total_title: "Total per year",
	total_intro: "Statistic cumulated per year.",
	age_title: "Total per age range",
	age_intro: "Each box represents a date range. First number is the total and second one the percentage of the overall total. \"Cases to hospitalization\" and \"Cases to deaths\" do describe the percentage of infected people who had to go to hospital or died. \"Population to vaccinated\" defines the percentage of how many from the age group are vaccinated.",
	mortality_title: "Mortality",
	mortality_intro: "The expected and actual death numbers in 2010 - 2021 between young (0 - 64) and elder (above 64). Graph is from <a href=\"https://www.bfs.admin.ch/bfs/en/home/statistics/health/state-health/mortality-causes-death.html\" target=\"_blank\" rel=\"noreferrer\">Swiss federal statistic office</a>.",
	footer: "This site is not endorsed with BAG. The source code from this site is available for the public at <a href=\"https://github.com/corostats/corostats\" target=\"_blank\" rel=\"noreferrer\">github.com/corostats/corostats</a>.",
	label: {
		population: 'Population',
		type: "Type",
		total: "Total",
		cases: "Cases",
		years: "years",
		hospitalization: "Hospitalization",
		deaths: "Deaths",
		vaccinated: "Vaccinated",
		cases_to_hospitalization: "Cases to hospitalization",
		cases_to_deaths: "Cases to deaths",
		population_to_vaccinated: "Population to vaccinated",
		unknown: 'Unknown',
		limit_range: 'Lower and upper limit'
	}
}
