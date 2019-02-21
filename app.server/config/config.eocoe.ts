import * as dotenv from 'dotenv'
import { ServerConfig } from './ServerConfig'

export const config: ServerConfig = {
  name: 'eocoe',
  maxProductCount: 10, // be sure to update client config too
  collectionSearchEndpoint: 'search/collection',
  collectionSearchOGCPattern: '',
  collectionSearchPattern: 'eo/*',
  productSearchEndpoint: 'search/product',
  productOGC: true
}

function getIntFromEnvVariable(env: string | undefined, defaultValue: number) : number {
  try {
    if (env !== undefined) {
      return Number.parseInt(env)
    }
  } finally {
    return defaultValue
  }
}

dotenv.config()

export const POSTGRES_HOST = process.env.POSTGRES_HOST
export const POSTGRES_PORT = getIntFromEnvVariable(process.env.POSTGRES_PORT, 5432)
export const POSTGRES_USER = process.env.POSTGRES_USER
export const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD
export const POSTGRES_DATABASE = process.env.POSTGRES_DATABASE
export const POSTGRES_SSL = process.env.POSTGRES_SSL === 'true' ? true : false

export const CATALOG_API_URL = `${process.env.CATALOG_API_PROTOCOL}://${process.env.CATALOG_API_HOST}`

export const GEOSERVER_URL = `${process.env.GEOSERVER_PROTOCOL}://${process.env.GEOSERVER_HOST}`
