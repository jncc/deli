import { ServerConfig } from './ServerConfig'

export const config: ServerConfig = {
  name: 'eocoe',
  maxProductCount: 10, // be sure to update client config too
  collectionSearchEndpoint: 'search/collection',
  collectionSearchOGCPattern: '',
  collectionSearchPattern: 'eo/*',
  productSearchEndpoint: 'search/product',
  productOGC: false,
}
