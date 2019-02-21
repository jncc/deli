import * as dotenv from 'dotenv'

// Need to do this here otherwise the const will return undefined
dotenv.config()

export const env = {
  POSTGRES_HOST: process.env.POSTGRES_HOST || '',
  POSTGRES_PORT: getIntFromEnvVariable(process.env.POSTGRES_PORT, 5432),
  POSTGRES_USER: process.env.POSTGRES_USER || '',
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD || '',
  POSTGRES_DATABASE: process.env.POSTGRES_DATABASE || '',
  POSTGRES_SSL: process.env.POSTGRES_SSL === 'true' ? true : false,
  CATALOG_API_URL: `${process.env.CATALOG_API_PROTOCOL}://${process.env.CATALOG_API_HOST}`,
  GEOSERVER_URL: `${process.env.GEOSERVER_PROTOCOL}://${process.env.GEOSERVER_HOST}`
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
