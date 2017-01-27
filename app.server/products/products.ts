
let turf = require("turf");

import { Product } from "./../capabilities/product";
import { products } from "./../data/data";
import { Query } from "./../query/query";


export function getProducts(q: Query): Product[] {

  let boundingBox = turf.bboxPolygon(q.bbox);

  let results = products
    .filter(p => turf.intersect(p.footprint, boundingBox))
    .filter(p => {
      let date = new Date(p.properties.capturedate);
      return date > q.start && date <= q.end;
    });

  return results;
}

