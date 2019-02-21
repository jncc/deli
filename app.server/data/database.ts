
import * as pgPromise from 'pg-promise'
import { IMain, IDatabase } from 'pg-promise'
import { env } from '../env'

/* Singleton database client. */
export class Database {

    public readonly connection: IDatabase<any>
    private static _instance: Database

    constructor() {
        let pgp = pgPromise()
        let cn = {
          host: env.POSTGRES_HOST,
          port: env.POSTGRES_PORT,
          database: env.POSTGRES_DATABASE,
          username: env.POSTGRES_USER,
          password: env.POSTGRES_PASSWORD,
          ssl: env.POSTGRES_SSL
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
