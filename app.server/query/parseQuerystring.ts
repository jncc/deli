import { Query } from './query';

/** Parses a Query object from an express req.query object, which frankly doesn't do a great job. */
export function parseQuerystring(q: any) {

    let x = JSON.parse(JSON.stringify(q)); // clone so we don't mess with internal express object

    // express won't parse a single value in the querystring as an array
    // but collections should be an array, so ensure it is, even when it's only one value (or missing)
    if (!x.collections) {
        x.collections = [];
    }
    else if (!Array.isArray(x.collections)) {
        x.collections = [x.collections];
    }

    // express will parse everything as a string
    // so fix up the bbox to be a number array
    x.bbox[0] = Number(x.bbox[0]);
    x.bbox[1] = Number(x.bbox[1]);
    x.bbox[2] = Number(x.bbox[2]);
    x.bbox[3] = Number(x.bbox[3]);

    return x;
}
