
// //import * as url from "url";
// import { Query } from "./query";

// /* Returns a Query object request.query object (for GET requests). */
// export function parseQueryFromUrl(o: any): Query {

//   //let parsedUrl: any = url.parse(s, true);
//   //console.log(s);

//   //let o = parsedUrl.query;
//   let q: Query = { dataset: "", bbox: [0,0,0,0] };

//       q.dataset = o.dataset;

//   if (o.dataset) {
//   } else {
//       throw "Query parse failed. No dataset specified.";
//   }

//   if (o.bbox) {
//       // todo validate
//       if (Array.isArray(o.bbox) && o.bbox.length === 4) {
//         q.bbox = o.bbox;
//       } else {
//         throw "Query parse failed. Bbox not array or wrong length.";
//       }
//   }
//   else {
//     throw "Query parse failed. No bbox specified.";
//   }

//   if (o.start) {
//     let start = new Date(o.start);
//     if (start) {
//       q.start = start;
//     }
//   }
// //   else {
// //     q.start = new Date(2016, 4, 1);
// //   }

//   if (o.end) {
//     let end = new Date(o.end);
//     if (end) {
//       q.end = end;
//     }
//   }
// //   else {
// //     q.end = new Date(2016, 4, 3);
// //   }
//   console.log("exiting parseQuery");

//   return q;
// }
