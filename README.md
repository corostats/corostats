# Corostats

The Github repo of corostats, a site which makes the [BAG](https://www.bag.admin.ch) statistics easy readable. The [site branch](https://github.com/corostats/corostats/tree/site) contains a running site which the built assets and a generated data. Keep in mind that this data is not up to date.

It is a zero dependency site and the code doesn't use any framework like vue.js or react as the project is small and the target is to keep the complexity simple.

## Development
First have to install the JS dependencies, run the following command in a terminal:

`npm install`

The build the assets, run the following command in a terminal:

`npm run build`

To generate the data, run the following command in a terminal:

`npm run data`

To automatically build the assets when you change the code, run the following command in a terminal:

`npm run watch`
`npm run watchsass`
