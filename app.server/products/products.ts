
let turf = require("turf");


import { products } from "./../data/data";


class Query {
  bbox:  [number, number, number, number]
  start: Date
  end:   Date
  type:  "raw" | "ndwi" | "ndvi"
}


export function getProducts(query: any) {

  let q = parseQuery(query);
  let boundingBox = turf.bboxPolygon(q.bbox);

  let results = products
    .filter(p => turf.intersect(p.footprint, boundingBox))
    .filter(p => {
      let date = new Date(p.properties.capturedate);
      return date > q.start && date <= q.end;
    });

  return results;
}

function parseQuery(o: any): Query {

  let q = new Query();

  if (o.bbox) {
    // todo validate
    q.bbox = JSON.parse(o.bbox);
  }
  else {
    q.bbox = [-5, 53, 2, 57];
  }

  if (o.start) {
    let start = new Date(o.start);
    if (start) {
      q.start = start;
    }
  }
  else {
    q.start = new Date(2016, 4, 1);
  }

  if (o.end) {
    let end = new Date(o.end);
    if (end) {
      q.end = end;
    }
  }
  else {
    q.end = new Date(2016, 4, 3);
  }

  if (o.type) {
    // todo validate
    q.type = o.type;
  }
  else {
    o.type = "raw";
  }

  return q;
}

// let query: Query = {
//   bbox: [-5, 53, 2.021, 57],
//   start: new Date(),
//   end: new Date(),
//   type: 'raw'
// };

// let x: any = {};
// let result = handleLayers(x);
// console.log(result);

// let query = parseQuery({bbox: '[-5, 55, 2, 57]', type: 'raw', start: '2016-04-01', end: '2016-04-02'});
// console.log(query);
