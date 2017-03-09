
import * as randomKey from "random-key";
import { IMain, IDatabase } from "pg-promise";
import * as pgPromise from "pg-promise";

import { Query } from "../query/query";


export interface StoredQuery {
    id:    string;
    query: Query;
}

export class FakeStoredQueryRepository {

    private data: StoredQuery[] = [
        { id: "may2016demo",
            query: {
                collections: ["s2-ard"],
                bbox:  [-15, 45, 15, 65],
                start: "2016-05-01",
                end:   "2016-05-31"
            }
        },
        { id: "june2016demo",
            query: {
                collections: ["s2-ard"],
                bbox:  [-15, 45, 15, 65],
                start: "2016-06-01",
                end:   "2016-06-31"
            }
        },
        { id: "fulldemo",
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
            let s = this.data.find(x => x.id == key)
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
            let s: StoredQuery = { id: key, query: query };
            this.data.push(s);
            resolve(s);
        });
    }
}


class database {
    public readonly connection: IDatabase<any>

    constructor() {
        let pgp = pgPromise();
        let dbConnectionString = '';
        this.connection = pgp(dbConnectionString);
    }
}


export class StoredQueryRepository {

    static db = new database();

    load(key: string): Promise<StoredQuery> {
        let q = 'select * from stored_queries where id = $1';
        return <Promise<StoredQuery>> StoredQueryRepository.db.connection.one(q, [key])
         .catch(error => console.error('failed to query db', error))
    }

    store(query: Query): Promise<StoredQuery> {
        let key = randomKey.generate(12);
        let q = 'insert into stored_queries(id, query) values ($1, $2) returning *';
        return <Promise<StoredQuery>> StoredQueryRepository.db.connection.one(q,[key, query], (result:StoredQuery) => result)
         .catch(error => console.error('failed to insert into db', error))
    }
}


