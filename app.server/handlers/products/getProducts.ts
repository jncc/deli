
let turf = require("turf");

import * as _ from "lodash";

import { QueryResult, Collection, Product } from "./models";
import { collections } from "../../data/data";
import { Query } from "../../query/query";

/* Returns products matching the query, nested within the collection they belong to. */
export function getProducts(q: Query): QueryResult {

    let boundingBox = turf.bboxPolygon(q.bbox);

    let products = _(collections[0].products)
        .filter(p => turf.intersect(p.footprint, boundingBox))
        .filter(p => {
          let date = new Date(p.properties.capturedate);
          let start = q.start === undefined ? new Date("2000-01-01") : new Date(q.start);
          let end = q.end === undefined ? new Date("2100-01-01") : new Date(q.end);
          return date > start && date <= end;
        })
        .orderBy(p => p.properties.capturedate) // there is no decent way to do thenBy title!
        .take(51) // assuming max 50 in UI
        .value();

    // return the result, containing the array of one collection, with just the matching products
    let result = { collections: _.cloneDeep(collections) };
    result.collections[0].products = products;
    return result;
}

