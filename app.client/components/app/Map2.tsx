import * as React from "react";
import * as ReactDOM from "react-dom"
import * as L from "leaflet";

import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

import { config } from "../../config";

export class Map2 extends React.Component<any, {}> {

  render() {

return (
  <div id="blah">
    <h3>sdsdfsdf</h3>
  <Map center={config.map.defaultCenter} zoom={config.map.defaultZoom}>
    <TileLayer
      url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    />
    <Marker position={[51.505, -0.09]}>
      <Popup>
        <span>A pretty CSS3 popup.<br/>Easily customizable.</span>
      </Popup>
    </Marker>
  </Map>
  </div>
);

  }
}

