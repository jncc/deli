
import { CollectionMetadata, CollectionData } from "../collections/models";

export interface GetProductsResult {
    collections: ProductCollection[]
}

export interface ProductCollection {
    id:         string,
    products:   Product[],
    metadata:   CollectionMetadata,
    data:       CollectionData,
}

export interface Product {
    id:         string,
    title:      string,
    bbox:       number[],
    osgbBbox:   number[],
    footprint:  any, // geojson
    properties: {
        capturedate?: string
    },
    data: {
        download?: {
            url:  string,
            size: number,
            type: string,
        },
        wms?: {
            name:     string,
            base_url: string
        }
    }
}
