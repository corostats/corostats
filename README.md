# Corostats

The Github repo of corostats, a site which makes the [BAG](https://www.bag.admin.ch) statistics easy readable. The [site branch](https://github.com/corostats/corostats/tree/site) contains a running site which the built assets and a generated data. Keep in mind that this data is not up to date.

It is a zero dependency site and the code doesn't use any framework like vue.js or react as the project is small and the target is to keep the complexity simple.

## Functionality
The site works the way, that it reads the data from a generated data.json file in the assets folder. This file is a summary from the large data sets of the [Swiss Open Data Hub](https://opendata.swiss/en/dataset/covid-19-schweiz). The following resources are used for the data:

- [https://www.covid19.admin.ch/api/data/.../COVID19Cases_geoRegion_AKL10_w.json](https://www.covid19.admin.ch/api/data/20210924-5fy7avyv/sources/COVID19Cases_geoRegion_AKL10_w.json)
- [https://www.covid19.admin.ch/api/data/.../COVID19Hosp_geoRegion_AKL10_w.json](https://www.covid19.admin.ch/api/data/20210924-5fy7avyv/sources/COVID19Hosp_geoRegion_AKL10_w.json)
- [https://www.covid19.admin.ch/api/data/.../COVID19Death_geoRegion_AKL10_w.json](https://www.covid19.admin.ch/api/data/20210924-5fy7avyv/sources/COVID19Death_geoRegion_AKL10_w.json)

If you want to have a look how the data is generated, check out the file [data/build.js](https://github.com/corostats/corostats/blob/main/data/build.js).

## Development
First have to install the JS dependencies, run the following command in a terminal:

`npm install`

To build the assets, run the following command in a terminal:

`npm run build`

To generate the data, run the following command in a terminal:

`npm run data`

To automatically build the assets when you change the code, run the following command in a terminal:

`npm run watch`

`npm run watchsass`
