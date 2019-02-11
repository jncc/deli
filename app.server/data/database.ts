
import * as pgPromise from 'pg-promise'
import { IMain, IDatabase } from 'pg-promise'
import  * as config from '../config/config';

/* Singleton database client. */
export class Database {

    public readonly connection: IDatabase<any>
    private static _instance: Database

    constructor() {
        let pgp = pgPromise()
        let cn = {
          host: config.POSTGRES_HOST,
          port: config.POSTGRES_PORT,
          database: config.POSTGRES_DATABASE,
          username: config.POSTGRES_USER,
          password: config.POSTGRES_PASSWORD,
          ssl: config.POSTGRES_SSL
        }
        this.connection = pgp(cn)
    }

    static get instance(): Database {
        if (!Database._instance) {
            Database._instance = new Database()
        }
        return Database._instance
    }
}
