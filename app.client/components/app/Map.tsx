
import * as React from "react";
import * as ReactDOM from "react-dom"
import * as L from "leaflet";
import "leaflet-editable";

import { config } from "../../config";
import { Query } from "../models/Query";
import { GetProductsResult, Product } from "../../../app.server/handlers/products/models";
import { bboxFlatArrayToCoordArray } from "../../../app.shared/util";

interface MapProps {
  query: Query;
  result: GetProductsResult;
  productHovered: (product: Product | undefined) => void;
  queryChanged: (query: Query) => void;
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
    this.updateProductsOnMap();
    this.updateCollectionsOnMap();
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

    map.setView(config.map.defaultCenter, config.map.defaultZoom)

    // add layer groups
    this.footprintLayerGroup = L.layerGroup([]).addTo(map);
    this.visualLayerGroup = L.layerGroup([]).addTo(map);

    // add the bbox rectangle
    let bboxRect = L.rectangle(bboxFlatArrayToCoordArray(this.props.query.bbox), { fillOpacity: 0 });
    bboxRect.addTo(map);
    bboxRect.enableEdit(); // enable a moveable bbox with leaflet.editable

    // update the query state when the bbox is altered
    map.on('editable:vertex:dragend', (e) => {
        if (e.layer === bboxRect) {
          let b = bboxRect.getBounds()
          let bbox = [b.getWest(), b.getSouth(), b.getEast(), b.getNorth()];
          this.props.queryChanged(Object.assign({}, this.props.query, { bbox: bbox }));
        }
    });
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
    // todo: we will need a way for the user to turn collection-level
    // WMS layers on and off rather than just showing them all
    this.props.result.collections.forEach(c => {
      let wmsUrl = c.data.wms.base_url;
      let wmsOptions = {
        layers: c.data.wms.name,
        format: 'image/png',
        transparent: true
      };
      let layer = L.tileLayer.wms(wmsUrl, wmsOptions);
      this.visualLayerGroup.addLayer(layer);
    });
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
    this.footprintLayerGroup.addLayer(footprint);
  }

}

const style = { fillOpacity: 0, weight: 1, color: '#666' }; // className can't get to work right now




/// /// ///

// map.on('click', this.onMapClick);
// onMapClick() {
//   console.log('clicked!');
// }
