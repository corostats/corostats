export default {
	title: "Corona Alterstatistiken für die Schweiz",
	timespan: "Das BAG veröffentlicht die Zahlen immer bis zur vergangenen Woche. Die hier benutzten Daten sind von <span class=\"update_date\"></span>. Die Population wird ebenfalls aus der Statistik ausgelesen und beträgt aktuell <span class=\"population\"></span> Personen.",
	intro: "Diese Seite macht die Corona Statistiken vom <a href=\"https://www.bag.admin.ch\" target=\"_blank\" rel=\"noreferrer\">Bundesamt für Gesundheit (BAG)</a> einfach lesbar. Die folgenden Daten wurden von dem <a href=\"https://opendata.swiss/en/dataset/covid-19-schweiz\"  target=\"_blank\" rel=\"noreferrer\">offiziellen Schweizer Open Government Data Hub</a> ausgelesen und sind für alle frei verfügbar.",
	total_title: "Total pro Jahr",
	total_intro: "Statistiken aufsummiert pro Jahr.",
	age_title: "Total pro Altersbereich",
	age_intro: "Jede Box repräsentiert einen Altersbereich. Die erste Zahl ist das Total und die zweite in Prozent zum Gesammttotal. \"Fälle zu Hospitalisierungen\" und \"Fälle zu Tote\" beschreiben die Prozent der Infizierten, welche im Spital behandelt oder gestorben sind. \"Population zu Geimpften\" definiert die Prozentzahl wieviele der Altersklasse geimpft sind.",
	mortality_title: "Sterblichkeit",
	mortality_intro: "Die erwartete und aktuelle Sterblichkeit im Jahre 2010 - 2021 zwischen jüngeren (0 - 64) and älteren (über 64) Personen. Die Grafik ist vom <a href=\"https://www.bfs.admin.ch/bfs/en/home/statistics/health/state-health/mortality-causes-death.html\" target=\"_blank\" rel=\"noreferrer\">Schweizer Bundesamt für Statistik</a>.",
	footer: "Diese Seite ist keine offizielle Seite vom BAG. Der Source Code dieser Seite kann eingesehen werden auf <a href=\"https://github.com/corostats/corostats\" target=\"_blank\" rel=\"noreferrer\">github.com/corostats/corostats</a>.",
	label: {
		population: 'Population',
		type: "Typ",
		total: "Total",
		cases: "Fälle",
		years: "Jahre",
		hospitalization: "Hospitalisierungen",
		deaths: "Tote",
		vaccinated: "Geimpft",
		cases_to_hospitalization: "Fälle zu Hospitalisierungen",
		cases_to_deaths: "Fälle zu Tote",
		population_to_vaccinated: "Population zu Geimpften",
		unknown: 'Unbekannt',
		limit_range: 'Untere und Obere Grenze'
	}
}
