
export interface Product {
    "id": string,
    "title": string,
    "footprint": any, // geojson
    "bbox": number[],
    "osgbBbox": number[],
    "properties": any,
    "data": {
        "download": {
            "url": string,
            "size": number,
            "type": string,
        },
        "wms": {
            "name": string,
            "base_url": string
        }
    }
}
