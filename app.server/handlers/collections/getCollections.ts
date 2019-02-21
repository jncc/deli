
import * as _ from 'lodash'

import { GetCollectionsResult, Collection } from './models'
import { collections } from '../../data/data'

/* Returns the available collections. The products within the collection
   are not included (there are potentially many of them).
   todo: make this queryable
*/
export function getCollections(): GetCollectionsResult {

    let q = _(collections)
        .map(c => ({
            id: c.id,
            metadata: c.metadata,
            metadataExternalLink: c.metadataExternalLink,
            data: c.data }))
        .sortBy(c => c.metadata.title)
        .value()

    return { collections: q }
}
