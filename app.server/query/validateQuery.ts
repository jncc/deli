import { collections } from './../data/data'

import { Query } from './query'

/* Throws an exception if the query isn't good. */
export function validateQuery(o: Query) {

    if (!Array.isArray(o.collections)) {
        throw 'Query validation failed. Collections not array.'
    }

    if (!o.collections || o.collections.length === 0) {
        throw 'Query validation failed. No collection specified.'
    }

    if (!o.bbox) {
        throw 'Query validation failed. No bbox specified.'
    }

    if (!Array.isArray(o.bbox)) {
        throw 'Query validation failed. Bbox not array.'
    }

    if (o.bbox.length !== 4) {
        throw 'Query validation failed. Bbox wrong length.'
    }

    // Set offset (page start) to default of 0 if not present or invalid
    if (!(o.offset && o.offset >= 0)) {
      o.offset = 0;
    }
    // Set limit (page size) to default of 50 if not present or invalid
    // i.e. < 0 OR > 50
    if (!(o.limit && o.limit > 0 && o.limit <= 50)) {
      o.limit = 50;
    }

    // todo.... more validations
}
