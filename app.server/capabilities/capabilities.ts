

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

export function makeLayerXml(p: Product): string {

  let xml = `
      <Layer queryable="1" opaque="0">
        <Name>${"s2_ard:" + p.title + "_rgba"}</Name>
        <Title>${p.title + "_rgba"}</Title>
        <Abstract>The ${p.title + ""}</Abstract>
        <KeywordList>
          <Keyword>GeoTIFF</Keyword>
        </KeywordList>
        <SRS>EPSG:27700</SRS>
        <LatLonBoundingBox minx="${p.bbox[0]}" miny="${p.bbox[1]}" maxx="${p.bbox[2]}" maxy="${p.bbox[3]}"/>
        <BoundingBox SRS="EPSG:27700" minx="${p.osgbBbox[0]}" miny="${p.osgbBbox[1]}" maxx="${p.osgbBbox[2]}" maxy="${p.osgbBbox[3]}"/>

      </Layer>`;

  return xml.trim();
}


