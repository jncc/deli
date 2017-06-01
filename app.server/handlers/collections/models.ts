
export interface GetCollectionsResult {
    collections: Collection[]
}

export interface Collection {
    id:         string,
    metadata:   CollectionMetadata,
    data:       CollectionData,
}

export interface CollectionMetadata {
    title: string,
    abstract: string,
}

export interface CollectionData {
    download?: {
        type: string,
        url:  string,
        size: number,
    },
    wms?: {
        base_url: string,
        name:     string,
    }
}
