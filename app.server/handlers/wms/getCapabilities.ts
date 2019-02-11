

import { Product } from './../products/models'
import { template } from './template'
import * as config from '../../config/config';

export function getCapabilities(products: Product[], wmsUrl: string): String {

  // make the xml for the products
  let productsXml = products
    .map((layer) => makeLayerXml(layer))
    .join('\n')

  // replace the {{{products}}} placeholder in the GetCapabilities xml template
  // and the root URL of the WMS server with the correct url
  // (split + join is javascript for 'String.replaceAll'!)
  return template
    .replace('{{{products}}}', productsXml)
    .split(config.GEOSERVER_URL).join(wmsUrl)
}

export function makeLayerXml(p: Product): string {

  let xml = `
      <Layer queryable='1' opaque='0'>
        <Name>${'s2_ard:' + p.title + '_rgba'}</Name>
        <Title>${p.title + '_rgba'}</Title>
        <Abstract>The ${p.title + ''}</Abstract>
        <KeywordList>
          <Keyword>GeoTIFF</Keyword>
        </KeywordList>
        <SRS>EPSG:27700</SRS>
        <LatLonBoundingBox minx='${p.bbox[0]}' miny='${p.bbox[1]}' maxx='${p.bbox[2]}' maxy='${p.bbox[3]}'/>
        <BoundingBox SRS='EPSG:27700' minx='${p.osgbBbox[0]}' miny='${p.osgbBbox[1]}' maxx='${p.osgbBbox[2]}' maxy='${p.osgbBbox[3]}'/>

      </Layer>`

  return xml.trim()
}
