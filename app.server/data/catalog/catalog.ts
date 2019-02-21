import * as config from '../../config/config';
import { GetCollectionsResult, WMSData } from '../../handlers/collections/models';
import { Query } from '../../../app.client/components/models/Query';
import { GetProductsResult } from '../../handlers/products/models';
import axios from 'axios';

import urljoin = require('url-join');
import turf = require('turf');

export class Catalog {
  geoserverLayers: { [id: string]: { base_url: string, name: string } };

  private addToGeoserverLayers(name: string, wms: WMSData) {
    if (this.geoserverLayers) {
      this.geoserverLayers[name] = wms;
    } else {
      this.geoserverLayers = {
        [name]: wms
      };
    }
  }

  async getOGCServiceList(): Promise<{ [id: string]: WMSData }> {
    let maxBbox = [-180.0, -85.06, 180.0, 85.06]
    let layers = await this.getProducts({
      collections: [config.config.collectionSearchOGCPattern],
      offset: 0,
      limit: 50,
      bbox: maxBbox,
      start: '',
      end: ''
    }).catch((err) => { console.error(err); throw err });

    layers.collections[0].products.forEach((layer) => {
      if (layer.data.wms && layer.data.catalog) {
        this.addToGeoserverLayers(layer.data.catalog.collection, {
          base_url: layer.data.wms.base_url,
          name: layer.data.wms.name
        });
      }
    });

    return Promise.resolve(this.geoserverLayers);
  }

  getOGCServiceForCollection(collection: string): WMSData {
    return this.geoserverLayers[collection];
  }

  public async getCollections(pattern: string = config.config.collectionSearchPattern): Promise<GetCollectionsResult> {
    return axios.get(urljoin(config.CATALOG_API_URL, config.config.collectionSearchEndpoint, pattern)).then((response) => {
      return {
        collections: (response.data.result).map((collection: any) => {
          return {
            id: collection.name,
            metadata: {
              title: collection.metadata.title,
              abstract: collection.metadata.abstract,
              useConstraints: collection.metadata.useConstraints
            },
            metadataExternalLink: collection.metadata.additionalInformationSource,
            data: {
              wms: this.getOGCServiceForCollection(collection.name)
            }
          }
        })
      };
    });
  }

  private generateWKTFromBBOX(bbox: number[]): string {
    let [minX, minY, maxX, maxY] = bbox
    return `POLYGON((${minX} ${minY}, ${minX} ${maxY}, ${maxX} ${maxY}, ${maxX} ${minY}, ${minX} ${minY}))`
  }

  public async getProducts(query: Query): Promise<GetProductsResult> {
    return axios.post(urljoin(config.CATALOG_API_URL, config.config.productSearchEndpoint), {
      collection: query.collections[0],
      footprint: this.generateWKTFromBBOX(query.bbox),
      spatialOp: 'overlaps',
      limit: query.limit,
      offset: query.offset
    }).then((response) => {
      return {
        collections: [{
          id: query.collections[0],
          metadata: { title: '', abstract: '', useConstraints: '' },
          metadataExternalLink: '',
          // If we are fetching the ogc layer don't set the wms for this collection
          data: query.collections[0] === config.config.collectionSearchOGCPattern ? {} : {
            wms: this.getOGCServiceForCollection(query.collections[0])
          },
          products: (response.data.result).map((product: any) => {
            let productSearchResult = {
              id: `${query.collections[0]}/${product.name}`,
              title: product.metadata.title,
              bbox: [product.metadata.boundingBox.west, product.metadata.boundingBox.south, product.metadata.boundingBox.east, product.metadata.boundingBox.north],
              footprint: {
                "type": "Feature",
                "properties": {
                  "id": product.metadata.title
                },
                "geometry": JSON.parse(product.footprint)
              },
              properties: {
                gridsquare: product.properties.osgbGridRef
              },
              data: {
                download: {},
                wms: {},
                catalog: {}
              }
            };

            if (product.data.product.http) {
              productSearchResult.data.download = product.data.product.http;
            } else {
              delete productSearchResult.data.download;
            }

            if (product.data.product.wms) {
              productSearchResult.data.wms = {
                base_url: product.data.product.wms.url,
                name: product.data.product.wms.name
              };
            } else {
              delete productSearchResult.data.wms;
            }

            if (product.data.product.catalog) {
              productSearchResult.data.catalog = product.data.product.catalog;
            } else {
              delete productSearchResult.data.catalog;
            }

            return productSearchResult;
          })
        }],
        query: {
          bboxArea: Math.round(turf.area(turf.bboxPolygon(query.bbox)) / 1000000),
          total: parseInt(response.data.query.total),
          limit: parseInt(response.data.query.limit),
          offset: parseInt(response.data.query.offset)
        }
      };
    });
  }
}
