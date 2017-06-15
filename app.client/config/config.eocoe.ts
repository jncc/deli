import { ClientConfig } from './ClientConfig'

export const config: ClientConfig = {
    name: 'eocoe',
    app: {
        title: `EO Collaboration Platform`, // todo: not yet configurable
    },
    logo: {
        name:   `todo`,
        width:  194,
        height: 46,
    },
    map: {
        defaultZoom: 5,
        defaultCenter: [54.50, -4.00] as [number, number],
        baseLayerUrlTemplate: `https://{s}.tiles.mapbox.com/v4/petmon.lp99j25j/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoicGV0bW9uIiwiYSI6ImdjaXJLTEEifQ.cLlYNK1-bfT0Vv4xUHhDBA`,
        attribution: `&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>`,
    },
    defaultQuery: {
        collections: [`d82f236a-e61d-482d-a581-293ec1b11c3e`],
        bbox:        [-8, 53, 0, 57] as [number, number, number, number] ,
        start:       `2016-06-01`,
        end:         `2016-06-08`,
    },
    defaultQueryResultInfo: {
        bboxArea:    0
    },
    form: {
        start:       true,
        end:         true,
    },
    maxProductCount: 10, // be sure to update server config too
    collectionWmsUrl: 'is this used?', // temp
};

