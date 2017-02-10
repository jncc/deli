
export interface Product {
    "id": string,
    "title": string,
    "footprint": any, // geojson GeoJSON.Feature<GeoJSON.Polygon>;
    "bbox": number[],
    "osgbBbox": number[],
    "properties": {
        capturedate: string
    },
    "representations": {
        "download": {
            "url": string,
            "size": number,
            "type": string,
        },
        "wms": {
            "name": string,
            "base_url": String
        }
    }
}
