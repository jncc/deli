
export interface ClientConfig {
    name: 'lidar' | 'eocoe',
    app: {
        title: string
        feedbackEmail: string
    },
    logo: {
        name:   string
        width:  number
        height: number
    },
    map: {
        defaultZoom:          number
        maximumZoom:          number
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
        bboxArea:    number,
        total:       number
    },
    form: {
        start: boolean
        end:   boolean
    },
    summary: {
        wms:  boolean
    },
    shoppingBasket: boolean,
    maxProductCount:  number
    collectionWmsUrl: string
}
