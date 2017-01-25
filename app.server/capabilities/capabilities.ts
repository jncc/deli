

import { Product } from "./product";
import { template } from "./template";

export function getCapabilities(layers: Product[], wmsUrl: string): String {

  // make the xml for the layers
  let layersXml = layers
    .map((layer) => makeLayerXml(layer))
    .join("\n");

  // replace the {{{layers}}} placeholder in the GetCapabilities xml template
  // and the root URL of the WMS server with the
  // todo: use wmsUrl, if it works
  return template
    .replace("{{{layers}}}", layersXml)
    .replace("https://eodip.jncc.gov.uk:443/geoserver", "http://deli-live.eu-west-1.elasticbeanstalk.com/geoserver");
    // javascript replace all!
    //.split("https://eodip.jncc.gov.uk:443/geoserver").join(wmsUrl)
    ;
}

export function makeLayerXml(product: Product): string {

  let xml = `
      <Layer queryable="1" opaque="0">
        <Name>${product.id}</Name>
        <Title>${product.title + "_rgba"}</Title>
        <Abstract></Abstract>
        <KeywordList>
          <Keyword>WCS</Keyword>
          <Keyword>GeoTIFF</Keyword>
        </KeywordList>
        <SRS>EPSG:27700</SRS>
        <LatLonBoundingBox minx="-6.12632079353505" miny="51.30238930387951" maxx="-1.3190873002504129" maxy="54.177806778383"/>
        <BoundingBox SRS="EPSG:27700" minx="130378.85316" miny="163032.59084999998" maxx="444543.80235" maxy="475787.06887"/>

      </Layer>`;

  return xml.trim();
}


