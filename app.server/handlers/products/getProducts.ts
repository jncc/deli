let turf = require('turf')

import * as _ from 'lodash'

import { GetProductsResult, ProductCollection, Product } from './models'
import { collections } from '../../data/data'
import { Query } from '../../query/query'
import { config } from '../../config/config'

/* Returns products matching the query, nested within the collection they belong to.
   Every collection asked for will be returned.
*/
export function getProducts(q: Query): GetProductsResult {

  let filterByCaptureDate = (p: Product) => {
    if (!p.properties.capturedate) {
      return true
    }
    else {
      let date = new Date(p.properties.capturedate)
      let start = q.start === undefined ? new Date('2000-01-01') : new Date(q.start)
      let end = q.end === undefined ? new Date('2100-01-01') : new Date(q.end)
      return date > start && date <= end
    }
  }

  let productsQuery = (products: Product[]) => {
    return _(products)
      .filter(p => turf.intersect(p.footprint, boundingBox))
      .filter(filterByCaptureDate)
      //.orderBy(orderByCaptureDate)
      //// .orderBy(p => p.properties.capturedate) //// there is no decent way to do thenBy title!
      .take(config.maxProductCount + 1) // return 1 extra so client knows if there are more
      .value()
  }

  let boundingBox = turf.bboxPolygon(q.bbox)

  let results = _(collections)
    .filter(c => q.collections.some(x => x === c.id))
    .map(c => ({
      id:       c.id,
      data:     c.data,
      metadata: c.metadata,
      products: productsQuery(c.products)
    }))
    .value()

  let bboxArea = Math.round(turf.area(boundingBox) / 1000000)

  return { collections: results, query: { bboxArea, total: results.length } }
}
