import * as dotenv from "dotenv";

function getIntFromEnvVariable(env: string | undefined, defaultValue: number) : number {
  try {
    if (env !== undefined) {
      return Number.parseInt(env);
    }
  } finally {
    return defaultValue;
  }
}

dotenv.config();

export const POSTGRES_HOST = process.env.POSTGRES_HOST;
export const POSTGRES_PORT = getIntFromEnvVariable(process.env.POSTGRES_PORT, 5432);
export const POSTGRES_USER = process.env.POSTGRES_USER;
export const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;
export const POSTGRES_DATABASE = process.env.POSTGRES_DATABASE;
export const POSTGRES_SSL = process.env.POSTGRES_SSL === 'true' ? true : false;

export const CATALOG_API_URL = `${process.env.CATALOG_API_PROTOCOL}://${process.env.CATALOG_API_HOST}`;

export const GEOSERVER_URL = `${process.env.GEOSERVER_PROTOCOL}://${process.env.GEOSERVER_HOST}`

/** This file gets overwritten in a production build with one of the
 *  tenant-specific config files in this directory */

import { ServerConfig } from './ServerConfig'

// feel free to change the below import to switch between tenant configs at dev time
import { config as c}  from './config.lidar'

export const config: ServerConfig = c
