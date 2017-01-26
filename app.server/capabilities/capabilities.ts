

import { Product } from "./product";
import { template } from "./template";

export function getCapabilities(products: Product[], wmsUrl: string): String {

  // make the xml for the products
  let productsXml = products
    .map((layer) => makeLayerXml(layer))
    .join("\n");

  // replace the {{{products}}} placeholder in the GetCapabilities xml template
  // and the root URL of the WMS server with the
  // todo: use wmsUrl, if it works
  return template
    .replace("{{{products}}}", productsXml)
    // javascript "string.replaceall"!
    //.split("https://eodip.jncc.gov.uk:443/geoserver").join(wmsUrl)
    .split("https://eodip.jncc.gov.uk:443/geoserver").join("http://deli-live.eu-west-1.elasticbeanstalk.com/geoserver")
    ;
}

export function makeLayerXml(product: Product): string {

  let xml = `
      <Layer queryable="1" opaque="0">
        <Name>${"s2_ard:" + product.title + "_rgba"}</Name>
        <Title>${product.title + "_rgba"}</Title>
        <Abstract></Abstract>
        <KeywordList>
          <Keyword>GeoTIFF</Keyword>
        </KeywordList>
        <SRS>EPSG:27700</SRS>
        <LatLonBoundingBox minx="${product.bbox[0]}" miny="${product.bbox[1]}" maxx="${product.bbox[2]}" maxy="${product.bbox[3]}"/>
        <BoundingBox SRS="EPSG:27700" minx="130378.85316" miny="163032.59084999998" maxx="444543.80235" maxy="475787.06887"/>

      </Layer>`;

  return xml.trim();
}


