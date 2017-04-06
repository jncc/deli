
// note: we need a type signature on a few of these properties to make
// the types compatible with @types/leaflet's overly-strict type definitions

export const config = {
    app: {
        title: `Scotland's Remote Sensed Data`, // todo: not yet configurable
    },
    logo: {
        name: `ssdi-logo.png`,
        width: 194,
        height: 46,
    },
    map: {
        defaultZoom: 7,
        defaultCenter: [56.50, -4] as [number, number],
        baseLayerUrlTemplate: `https://{s}.tiles.mapbox.com/v4/petmon.lp99j25j/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoicGV0bW9uIiwiYSI6ImdjaXJLTEEifQ.cLlYNK1-bfT0Vv4xUHhDBA`,
        attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
    },
    defaultQuery: {
        collections: [`5f3b081f-c02c-49b3-8374-a5dd709baefd`], //[`51e72581-75ce-4f0f-8e1f-829226bc7a58`], // DSM
        bbox: [-5, 56, -3, 57], // [[56, -5], [57, -3]] as [[number, number], [number, number]],
        start: `2016-06-01`,
        end:   `2016-06-31`,
    },
    maxProductCount: 50,
};

