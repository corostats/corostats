export default {
	title: "Corona age statistics for Switzerland",
	intro: "This site makes the Corona stats from BAG easy readable. The following data is fetched from the <a href=\"https://opendata.swiss/en/dataset/covid-19-schweiz\"  target=\"_blank\">official Swiss government open data hub</a> and is freely available for everybody. The tables were updated the last time at <span class=\"update_date\"></span>.",
	total_title: "Total per year",
	total_intro: "Statistic cumulated per year.",
	age_title: "Total per age range",
	age_intro: "Each box represents a date range. First number is the total and second one the percentage of the overall total.",
	mortality_title: "Mortality",
	mortality_intro: "The expected and actual death numbers in 2020 - 2021 between young (0 - 64) and elder (above 64). Graph is from <a href=\"https://www.bfs.admin.ch/bfs/en/home/statistics/health/state-health/mortality-causes-death.html\" target=\"_blank\">Swiss federal statistic office</a>.",
	footer: "This site is not endorsed with BAG. The source code from this site is available for the public at <a href=\"github.com/corostats/corostats\" target=\"_blank\">github.com/corostats/corostats</a>.",
	label: {
		type: "Type",
		total: "Total",
		cases: "Cases",
		years: "years",
		hospitalization: "Hospitalization",
		deaths: "Deaths",
		cases_to_hospitalization: "Cases to hospitalization",
		cases_to_deaths: "Cases to Deaths",
		unknown: 'Unknown'
	}
}
