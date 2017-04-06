let turf = require("turf");

import * as _ from "lodash";

import { GetProductsResult, ProductCollection, Product } from "./models";
import { collections } from "../../data/data";
import { Query } from "../../query/query";

/* Returns products matching the query, nested within the collection they belong to.
   Every collection asked for will be returned.
*/
export function getProducts(q: Query): GetProductsResult {

    let boundingBox = turf.bboxPolygon(q.bbox);

    let results = _(collections)
        .filter(c => q.collections.some(x => x === c.id))
        .map(c => ({
            id: c.id,
            data: c.data,
            metadata: c.metadata,
            products: _(c.products)
                .filter(p => turf.intersect(p.footprint, boundingBox))
                //// .filter(p => {
                ////   let date = new Date(p.properties.capturedate);
                ////   let start = q.start === undefined ? new Date("2000-01-01") : new Date(q.start);
                ////   let end = q.end === undefined ? new Date("2100-01-01") : new Date(q.end);
                ////   return date > start && date <= end;
                //// })
                //// .orderBy(p => p.properties.capturedate) //// there is no decent way to do thenBy title!
                //.take(51) // assuming max 50 in UI
                .value(),
        }))
        .value();

    return { collections: results };
}

