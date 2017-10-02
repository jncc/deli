import { ClientConfig } from './ClientConfig'

export const config: ClientConfig = {
    name: 'lidar',
    app: {
        title: `Remote Sensing Data Scotland`, // todo: not yet configurable
        feedbackEmail: 'gi-sat@gov.scot'
    },
    logo: {
        name:   `ssdi-logo.png`,
        width:  194,
        height: 46,
    },
    map: {
        defaultZoom: 7,
        maximumZoom: 13,
        defaultCenter: [56.50, -4] as [number, number],
        baseLayerUrlTemplate: `https://{s}.tiles.mapbox.com/v4/petmon.lp99j25j/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoicGV0bW9uIiwiYSI6ImdjaXJLTEEifQ.cLlYNK1-bfT0Vv4xUHhDBA`,
        attribution: `Backdrop &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>`,
    },
    defaultQuery: {
        collections: [`7d96723a-49c9-4d17-8df1-2a96932112d4`], // Phase 1 DSM collection
        bbox:        [-4.5, 56.1, -3.5, 56.7] as [number, number, number, number] ,
        start:       `2016-06-01`,
        end:         `2016-06-31`,
    },
    defaultQueryResultInfo: {
        bboxArea:    13679
    },
    form: {
        start:       false,
        end:         false,
    },
    summary: {
        wms:         false,
    },
    shoppingBasket:  false,
    maxProductCount: 50, // be sure to update server config too
    collectionWmsUrl: 'https://eo.jncc.gov.uk/geoserver/scotland/wms', // temp
};

