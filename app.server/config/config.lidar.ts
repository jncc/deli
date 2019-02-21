import { ServerConfig } from './ServerConfig'

export const config: ServerConfig = {
  name: 'lidar',
  maxProductCount: 50, // be sure to update client config too
  collectionSearchEndpoint: 'search/collection',
  collectionSearchOGCPattern: 'scotland-gov/lidar/ogc',
  collectionSearchPattern: 'scotland-gov/lidar/phase*',
  productSearchEndpoint: 'search/product',
  productOGC: false,
}
