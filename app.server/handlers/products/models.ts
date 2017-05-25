
import { CollectionMetadata, CollectionData } from '../collections/models'

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
    bbox:       number[], // [number, number, number, number],
    osgbBbox:   number[],
    footprint:  any, // geojson
    properties: {
        [key: string]: string | undefined // typescript index signature
        capturedate?: string,
        gridsquare?: string,
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
