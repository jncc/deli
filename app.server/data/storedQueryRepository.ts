
import { Query } from "../query/query";
let randomKey = require('random-key');

export class StoredQuery {
    constructor(public key: string, public query: Query) {}
}

export class FakeStoredQueryRepository {

    private data: StoredQuery[] = [
        { key: "may2016demo",
            query: {
                collections: ["s2-ard"],
                bbox:  [-15, 45, 15, 65],
                start: "2016-05-01",
                end:   "2016-05-31"
            }
        },
        { key: "june2016demo",
            query: {
                collections: ["s2-ard"],
                bbox:  [-15, 45, 15, 65],
                start: "2016-06-01",
                end:   "2016-06-31"
            }
        },
        { key: "fulldemo",
            query: {
                collections: ["s2-ard"],
                bbox:  [-15,45,15,65],
                start: "2014-01-01",
                end:   "2020-01-01"
            }
        },
    ];

    load(key: string): Promise<StoredQuery> {
        return new Promise((resolve, reject) => {
            let s = this.data.find(x => x.key == key)
            if (s === undefined) {
                reject(`Couldn't find query with key '${key}'`);
            } else {
                resolve(s);
            }
        });
    }

    store(query: Query): Promise<StoredQuery> {
        return new Promise((resolve, reject) => {
            let key = randomKey.generate(12); // e.g. 3BOlkkWgWn6z
            let s = new StoredQuery(key, query);
            this.data.push(s);
            resolve(s);
        });
    }
}

export class StoredQueryRepository {

    load(key: string): Promise<StoredQuery> {
        throw 'not implemented';
    }

    store(query: Query): Promise<StoredQuery> {
        throw 'not implemented';
    }
}
