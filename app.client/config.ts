
// note: we need a type signature on a few of these properties to make
// the types compatible with Leaflet's overly-strict type definitions

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
        zoom: 7,
        center: [56.50, -4] as [number, number],
        bbox: [[56, -5], [57, -3]] as [[number, number], [number, number]],
        baseLayerUrlTemplate: `https://{s}.tiles.mapbox.com/v4/petmon.lp99j25j/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoicGV0bW9uIiwiYSI6ImdjaXJLTEEifQ.cLlYNK1-bfT0Vv4xUHhDBA`,
    }
};

