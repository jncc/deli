
export interface GetCollectionsResult {
    collections: Collection[]
}

export interface Collection {
    id:         string,
    metadata:   CollectionMetadata,
    data:       CollectionData,
    //licence:    'ogl' | 'none'
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
    wms?: {
        base_url: string,
        name:     string,
    }
}
