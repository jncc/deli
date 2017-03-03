
import * as React from "react";
import * as ReactDOM from "react-dom"
import * as L from "leaflet";
//import { L } from "leaflet";

import { Product } from "./models/Product";

interface MapProps {
  scenes: Product[];
  productHovered: (product: Product | undefined) => void;
}

export class Map extends React.Component<MapProps, {}> {

  map: L.Map;
  layerGroup: L.LayerGroup;

  componentDidMount() {
    let map = this.map = L.map(ReactDOM.findDOMNode(this) as HTMLElement, {
      minZoom: 2,
      maxZoom: 20,
      layers: [
        L.tileLayer(
          'https://{s}.tiles.mapbox.com/v4/petmon.lp99j25j/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoicGV0bW9uIiwiYSI6ImdjaXJLTEEifQ.cLlYNK1-bfT0Vv4xUHhDBA',
          { attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>' })
      ],
      attributionControl: false,
    });

    map.on('click', this.onMapClick);
    this.layerGroup = L.layerGroup([]).addTo(map);
    map.setView([54.50, -4.00], 5)

    // add the bbox
    L.rectangle([[53, -8], [57, 0]], { fillOpacity: 0.1 }).addTo(this.map);
  }

  // componentWillUnmount() {
  //   this.map.off('click', this.onMapClick);
  //   this.map = null;
  // }


  addProductToMap(p: Product) {
        let wmsUrl = 'http://deli-live.eu-west-1.elasticbeanstalk.com/geoserver/ows?tiled=true';

        let wmsOptions = {
          layers: "s2_ard:" + p.title + "_rgba",
          format: 'image/png',
          transparent: true
        };

          let x: L.WMSOptions;

        // add the product image
        let image = L.tileLayer.wms(wmsUrl, wmsOptions);
        this.layerGroup.addLayer(image);

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
    }
 }

  onMapClick() {
    console.log('clicked!');
  }

  render() {
    return <div className="map"></div>;
  }
}

const style = { fillOpacity: 0, weight: 0, color: '#666' }; // className can't get to work right now
