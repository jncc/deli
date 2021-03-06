
import { CollectionMetadata, CollectionData } from '../collections/models'

export interface GetProductsResult {
    collections: ProductCollection[]
    query: {
      bboxArea: number // incidental info in km2 calculated for the user
      total: number
    }
}

export interface ProductCollection {
    id:                    string,
    products:              Product[],
    metadata:              CollectionMetadata,
    metadataExternalLink?: string,
    data:                  CollectionData,
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
        },
        catalog?: {
          collection: string,
          product?: string
        }
    }
}
