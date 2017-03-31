
export interface GetProductsResult {
    collections: ProductCollection[]
}

export interface ProductCollection {
    id:         string,
    products:   Product[],
    metadata:   ProductMetadata
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
        //// wms: {
        ////     name:     string,
        ////     base_url: string
        //// }
    }
}

export interface ProductMetadata {
    // todo
}
