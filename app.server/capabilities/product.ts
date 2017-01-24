
export interface Product {
    "id": String,
    "title": String,
    "footprint": String, // geojson
    "properties": any,
    "representations": {
        "download": {
            "url": String,
            "size": number,
            "type": String,
        },
        "wms": {
            "name": String,
            "base_url": String
        }
    }
}
