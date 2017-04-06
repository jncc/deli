
import * as React from "react";
import * as ReactDOM from "react-dom"
import * as L from "leaflet";
import "leaflet-editable";

import { config } from "../../config";
import { GetProductsResult, Product } from "../../../app.server/handlers/products/models";

interface MapProps {
  result: GetProductsResult;
  productHovered: (product: Product | undefined) => void;
}

export class Map extends React.Component<MapProps, {}> {

  map: L.Map;
  footprintLayerGroup: L.LayerGroup;
  visualLayerGroup: L.LayerGroup;

  render() {
    // react will have nothing to do with the leaflet map
    // all events will be handled manually
    return <div className="map"></div>;
  }

  componentDidMount() {
    this.createLeafletMap();
  }

  componentDidUpdate(prevProps, prevState) {
    this.updateCollectionsOnMap();
    this.updateProductsOnMap();
  }

  // end of react lifecycle overrides; here follows leaflet map implementation code

  createLeafletMap() {
    let map = this.map = L.map(ReactDOM.findDOMNode(this) as HTMLElement, {
      minZoom: 2,
      maxZoom: 20,
      layers: [
        L.tileLayer(config.map.baseLayerUrlTemplate, { attribution: config.map.attribution })
      ],
      attributionControl: false,
      editable: true // enable leaflet.editable plugin
    });

    map.setView(config.map.center, config.map.zoom)

    // add layer groups
    this.footprintLayerGroup = L.layerGroup([]).addTo(map);
    this.visualLayerGroup = L.layerGroup([]).addTo(map);

    // add the bbox
    let bbox = L.rectangle(config.map.bbox, { fillOpacity: 0 });
    bbox.addTo(map);
    bbox.enableEdit(); // enable a moveable bbox with leaflet.editable
  }

  updateProductsOnMap() {
    // [ invoked immediately after updating occurs
    //   not called for the initial render ]

      this.footprintLayerGroup.clearLayers();
      // add all products in all collections
      this.props.result.collections.forEach(c => {
        c.products.forEach(p => this.addProductToMap(p));
      });
  }

  updateCollectionsOnMap() {

    let wmsUrl = 'https://eo.jncc.gov.uk/geoserver/ows';
    let wmsOptions = {
      layers: "scotland:scotland-lidar-1-dsm",
      format: 'image/png',
      transparent: true
    };
    let x: L.WMSOptions;
    let image = L.tileLayer.wms(wmsUrl, wmsOptions);
    this.footprintLayerGroup.addLayer(image);
  }

  addProductToMap(p: Product) {

    //// let wmsUrl = 'http://deli-live.eu-west-1.elasticbeanstalk.com/geoserver/ows?tiled=true';

    //// let wmsOptions = {
    ////   layers: "s2_ard:" + p.title + "_rgba",
    ////   format: 'image/png',
    ////   transparent: true
    //// };

    ////   let x: L.WMSOptions;

    //// //// add the product image
    //// let image = L.tileLayer.wms(wmsUrl, wmsOptions);
    //// this.layerGroup.addLayer(image);

    // add the product footprints
    //let x : L.StyleFunction
    let footprint = L.geoJSON(p.footprint, style);
    footprint.on('mouseover', () => {
      footprint.setStyle(() => ({ weight: 3, color: '#cc002e' }));
      //console.log('mouseover');
      //this.props.productHovered(p);
    });
    footprint.on('mouseout', () => {
      footprint.setStyle(() => style);
      //this.props.productHovered(undefined);
    });
    this.visualLayerGroup.addLayer(footprint);
  }

}

const style = { fillOpacity: 0, weight: 1, color: '#666' }; // className can't get to work right now




/// /// ///

// map.on('click', this.onMapClick);
// onMapClick() {
//   console.log('clicked!');
// }
