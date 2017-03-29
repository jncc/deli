
export interface QueryResult {
    collections: Collection[]
}

export interface Collection {
    id:         string,
    products:   Product[],
    metadata:   Metadata
}

export interface Product {
    id:         string,
    title:      string,
    bbox:       number[],
    osgbBbox:   number[],
    footprint:  any, // geojson
    properties: any,
    data: {
        download: {
            url:  string,
            size: number,
            type: string,
        },
        // wms: {
        //     name:     string,
        //     base_url: string
        // }
    }
}

export interface Metadata {
    // todo
}
