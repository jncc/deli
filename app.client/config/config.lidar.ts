import { ClientConfig } from './ClientConfig'

export const config: ClientConfig = {
    name: 'lidar',
    app: {
        title: `Scotland's Remote Sensed Data`, // todo: not yet configurable
    },
    logo: {
        name:   `ssdi-logo.png`,
        width:  194,
        height: 46,
    },
    map: {
        defaultZoom: 7,
        defaultCenter: [56.50, -4] as [number, number],
        baseLayerUrlTemplate: `https://{s}.tiles.mapbox.com/v4/petmon.lp99j25j/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoicGV0bW9uIiwiYSI6ImdjaXJLTEEifQ.cLlYNK1-bfT0Vv4xUHhDBA`,
        attribution: `&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>`,
    },
    defaultQuery: {
        collections: [`5f3b081f-c02c-49b3-8374-a5dd709baefd`], // DTM collection
        bbox:        [-5, 56, -3, 57] as [number, number, number, number] ,
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
    maxProductCount: 50, // be sure to update server config too
    collectionWmsUrl: 'https://eo.jncc.gov.uk/geoserver/scotland/wms', // temp
};

