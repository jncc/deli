
// we need a type signature on a few properties to make the types compatible
// with Leaflet's overly-strict type definitions

export const config = {
    map: {
        zoom: 5,
        center: [54.50, -4.00] as [number, number],
        bbox: [[53, -8], [57, 0]] as [[number, number], [number, number]],
        baseLayerUrlTemplate: 'https://{s}.tiles.mapbox.com/v4/petmon.lp99j25j/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoicGV0bW9uIiwiYSI6ImdjaXJLTEEifQ.cLlYNK1-bfT0Vv4xUHhDBA',
    }
};
