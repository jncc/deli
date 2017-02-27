
import { Query } from "./query";

/* Throws an exception if the query isn't good. */
export function validateQuery(o: Query) {

    if (!o.dataset) {
        throw "Query validation failed. No dataset specified.";
    }

    if (!o.bbox) {
        throw "Query validation failed. No bbox specified.";
    }

    if (!Array.isArray(o.bbox)) {
        throw "Query validation failed. Bbox not array.";
    }

    if (o.bbox.length !== 4) {
        throw "Query validation failed. Bbox wrong length.";
    }

    // todo.... more validations
}
