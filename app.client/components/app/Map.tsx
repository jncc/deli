
import * as React from "react";
import * as ReactDOM from "react-dom"
import * as L from "leaflet";

import { config } from "../../config";
import { Product } from "../models/Product";

interface MapProps {
  scenes: Product[];
  productHovered: (product: Product | undefined) => void;
}


export class Map extends React.Component<MapProps, {}> {

  map: L.Map;
  layerGroup: L.LayerGroup<any>;

  componentDidMount() {
    let map = this.map = L.map(ReactDOM.findDOMNode(this) as HTMLElement, {
      minZoom: 2,
      maxZoom: 20,
      layers: [
        L.tileLayer(
          config.map.baseLayerUrlTemplate,
          { attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>' })
      ],
      attributionControl: false,
      editable: true // leaflet.editable plugin
    });

    map.on('click', this.onMapClick);
    this.layerGroup = L.layerGroup([]).addTo(map);
    map.setView(config.map.center, config.map.zoom)

    // add the bbox
    let bbox = L.rectangle(config.map.bbox, { fillOpacity: 0.1 });
    bbox.enableEdit();
    bbox.addTo(this.map);
  }

  // componentWillUnmount() {
  //   this.map.off('click', this.onMapClick);
  //   this.map = null;
  // }

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

        // add the product border
        //let x : L.StyleFunction
        let border = L.geoJSON(p.footprint, style);
        border.on('mouseover', () => {
          border.setStyle(() => ({ weight: 3, color: '#cc002e' }));
          //console.log('mouseover');
          //this.props.productHovered(p);
        });
        border.on('mouseout', () => {
          border.setStyle(() => style);
          //this.props.productHovered(undefined);
        });
        this.layerGroup.addLayer(border);
    }

  componentDidUpdate(prevProps, prevState) {
    console.log("map component updated");
    // console.log(this.props);
    // console.log(prevProps);

    if (this.map) {
      this.layerGroup.clearLayers();
      this.props.scenes.forEach(p => this.addProductToMap(p));


      // hackily add the collection-level wms
      let wmsUrl = 'https://eo.jncc.gov.uk/geoserver/ows';
      let wmsOptions = {
        layers: "scotland:lidar-1-dsm",
        format: 'image/png',
        transparent: true
      };
      let x: L.WMSOptions;
      let image = L.tileLayer.wms(wmsUrl, wmsOptions);
      this.layerGroup.addLayer(image);


    }
 }

  onMapClick() {
    console.log('clicked!');
  }

  render() {
    return <div className="map"></div>;
  }
}

const style = { fillOpacity: 0, weight: 1, color: '#666' }; // className can't get to work right now
