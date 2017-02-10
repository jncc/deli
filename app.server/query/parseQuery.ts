
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
    q.bbox = JSON.parse(o.bbox);
  }
  else {
    // q.bbox = [-5, 53, 2, 57];
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

  return q;
}
