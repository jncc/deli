
let turf = require("turf");

import { Product } from "./product";
import { products } from "../../data/data";
import { Query } from "../../query/query";


export function getProducts(q: Query): Product[] {

  let boundingBox = turf.bboxPolygon(q.bbox);

  let results = products
    .filter(p => turf.intersect(p.footprint, boundingBox))
    .filter(p => {
      let date = new Date(p.properties.capturedate);
      let start = q.start === undefined ? new Date("2000-01-01") : new Date(q.start);
      let end = q.end === undefined ? new Date("2100-01-01") : new Date(q.end);
      return date > start && date <= end;
    });

  return results;
}

