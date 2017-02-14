
import { Query } from "./query";

export function parseQuery(o: any): Query {

  let q: Query = { dataset: "", bbox: [0,0,0,0] };


  if (o.dataset) {
      q.dataset = o.dataset;
  } else {
      throw "Query parse failed. No dataset specified.";
  }

  if (o.bbox) {
      // todo validate
      if (Array.isArray(o.bbox) && o.bbox.length === 4) {
        q.bbox = o.bbox;
      } else {
        throw "Query parse failed. Bbox not array or wrong length.";
      }
  }
  else {
    throw "Query parse failed. No bbox specified.";
  }

  if (o.start) {
    let start = new Date(o.start);
    if (start) {
      q.start = start;
    }
  }
//   else {
//     q.start = new Date(2016, 4, 1);
//   }

  if (o.end) {
    let end = new Date(o.end);
    if (end) {
      q.end = end;
    }
  }
//   else {
//     q.end = new Date(2016, 4, 3);
//   }
  console.log("exiting parseQuery");

  return q;
}
