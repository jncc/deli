

export interface ClientConfig {
    name: 'lidar' | 'eocoe',
    app: {
        title: string
    },
    logo: {
        name:   string
        width:  number
        height: number
    },
    map: {
        defaultZoom:          number
        defaultCenter:        [number, number]
        baseLayerUrlTemplate: string
        attribution:          string
    },
    defaultQuery: {
        collections: string[]
        bbox:        [number, number, number, number]
        start:       string
        end:         string
    },
    defaultQueryResultInfo: {
        bboxArea:    number
    },
    form: {
        start: boolean
        end:   boolean
    },
    maxProductCount:  number
    collectionWmsUrl: string
}
