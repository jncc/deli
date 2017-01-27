
import { Query } from "./query";

export class None {}

export function parseQuery(o: any): Query | None {

  let q: Query = { dataset: "", bbox: [0,0,0,0] };

  if (o.dataset) {
      q.dataset = o.dataset;
  } else {
      return None;
  }

  if (o.bbox) {
    // todo validate
    q.bbox = JSON.parse(o.bbox);
  }
  else {
    return None; // q.bbox = [-5, 53, 2, 57];
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
