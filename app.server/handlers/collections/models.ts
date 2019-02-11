
export interface GetCollectionsResult {
    collections: Collection[]
}

export interface Collection {
    id:                    string,
    metadata:              CollectionMetadata,
    metadataExternalLink?: string,
    data:                  CollectionData,
}

export interface CollectionMetadata {
    title: string,
    abstract: string,
    useConstraints: string,
}

export interface CollectionData {
    download?: {
        type: string,
        url:  string,
        size: number,
    },
    wms?: WMSData
}

export interface WMSData {
  base_url: string,
  name: string
}
