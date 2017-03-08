
let turf = require("turf");

import * as _ from "lodash";

import { Product } from "./product";
import { products } from "../../data/data";
import { Query } from "../../query/query";


export function getProducts(q: Query): Product[] {

    let boundingBox = turf.bboxPolygon(q.bbox);

    let results = _(products)
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

    return results;
}

