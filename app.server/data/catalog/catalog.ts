import * as config from '../../config/config';
import { GetCollectionsResult, Collection, WMSData } from '../../handlers/collections/models'
import * as request from 'request-promise-native';
import { Query } from '../../../app.client/components/models/Query';
import { GetProductsResult } from '../../handlers/products/models';

import urljoin = require('url-join');
import turf = require('turf')

export class Catalog {
  collectionSearchEndpoint: string = 'search/collection';
  collectionSearchOGCPattern: string = 'scotland-gov/lidar/ogc';
  collectionSearchLidarPattern: string = 'scotland-gov/lidar/phase*';

  productSearchEndpoint: string = 'search/product'

  geoserverWorkspacePath: string = 'scotland/wms'
  geoserverFullWMSURL: string = urljoin(config.GEOSERVER_URL, this.geoserverWorkspacePath);

  private getCollectionNameFromID(id: string): string {
    switch(id) {
      case 'b32e4101-6d8a-538b-9c01-a23389acfe35':
        return 'scotland-gov/lidar/phase-1/dsm'
      case '572c2ead-84bc-5d27-8a2e-8fb1b35e5acc':
        return 'scotland-gov/lidar/phase-1/dtm'
      case 'ddc9c05b-6060-5abb-92c4-5586ed52ad77':
        return 'scotland-gov/lidar/phase-1/laz'
      case '227b2528-0c7b-58f1-9e4e-315a1491969c':
        return 'scotland-gov/lidar/phase-2/dsm'
      case '4bbd5cc3-d879-55e0-a44d-2567697a1471':
        return 'scotland-gov/lidar/phase-2/dtm'
      case 'a4b6e778-0fc6-5fe6-9c70-9721ad9a1ff8':
        return 'scotland-gov/lidar/phase-2/laz'
      default:
        throw 'Unknown collection'
    }
  }

  private getOGCServiceForCollection(collection: string): WMSData {
    switch (collection) {
      case 'scotland-gov/lidar/phase-1/dsm':
        return {
          base_url: this.geoserverFullWMSURL,
          name: 'scotland:scotland-lidar-1-dsm'
        };
      case 'scotland-gov/lidar/phase-1/dtm':
        return {
          base_url: this.geoserverFullWMSURL,
          name: 'scotland:scotland-lidar-1-dtm'
        };
      case 'scotland-gov/lidar/phase-1/laz':
        return {
          base_url: this.geoserverFullWMSURL,
          name: 'scotland:scotland-lidar-1-dsm'
        };
      case 'scotland-gov/lidar/phase-2/dsm':
        return {
          base_url: this.geoserverFullWMSURL,
          name: 'scotland:scotland-lidar-2-dsm'
        };
      case 'scotland-gov/lidar/phase-2/dtm':
        return {
          base_url: this.geoserverFullWMSURL,
          name: 'scotland:scotland-lidar-2-dtm'
        };
      case 'scotland-gov/lidar/phase-2/laz':
        return {
          base_url: this.geoserverFullWMSURL,
          name: 'scotland:scotland-lidar-2-dsm'
        };
      default:
        return {
          base_url: this.geoserverFullWMSURL,
          name: 'scotland:scotland-lidar-1-dsm'
        };
    }
  }

  public async getCollections(pattern: string = this.collectionSearchLidarPattern): Promise<GetCollectionsResult> {
    return request({
      uri: urljoin(config.CATALOG_API_URL, this.collectionSearchEndpoint, pattern),
      json: true
    }).then(async (retJson) => {
      return {
        collections: (retJson.result).map((collection:any) => {
          return {
            id: collection.id,
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

  private generateGeoJSONFromBBOX(bbox: number[]): string {
    // [minX, minY, maxX, maxY]
    let minX = 0;
    let minY = 1;
    let maxX = 2;
    let maxY = 3;
    return `POLYGON((${bbox[minX]} ${bbox[minY]}, ${bbox[minX]} ${bbox[maxY]}, ${bbox[maxX]} ${bbox[maxY]}, ${bbox[maxX]} ${bbox[minY]}, ${bbox[minX]} ${bbox[minY]}))`
  }

  public async getProducts(query: Query): Promise<GetProductsResult> {
    return request({
        uri: urljoin(config.CATALOG_API_URL, this.productSearchEndpoint),
        method: 'POST',
        body: {
          collection: this.getCollectionNameFromID(query.collections[0]),
          footprint: this.generateGeoJSONFromBBOX(query.bbox),
          spatialOp: 'overlaps',
          limit: query.limit,
          offset: query.offset
        },
        json: true
    }).then(async (retJson) => {
      return {
        collections: [ {
          id: query.collections[0],
          metadata: {title: '', abstract: '', useConstraints: ''},
          metadataExternalLink: '',
          data: {
            wms: this.getOGCServiceForCollection(this.getCollectionNameFromID(query.collections[0]))
          },
          products: (retJson.result).map((product:any) => {
            return {
              id: product.id,
              title: product.metadata.title,
              bbox: [product.metadata.boundingBox.west, product.metadata.boundingBox.south, product.metadata.boundingBox.east, product.metadata.boundingBox.north],
              osgbBbox: [product.metadata.boundingBox.west, product.metadata.boundingBox.south, product.metadata.boundingBox.east, product.metadata.boundingBox.north],
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
                download: {
                  url: product.data.product.http.url,
                  size: product.data.product.http.size,
                  type: product.data.product.http.type
                }
              }
            }
          })
        } ],
        query: {
          bboxArea: Math.round(turf.area(turf.bboxPolygon(query.bbox)) / 1000000),
          total: retJson.query.total
        }
      }
    });
  }

  // getProducts(query: Query): Promise<GetProductsResult> {


  //   return {
  //     p
  //   }
  // }
}
