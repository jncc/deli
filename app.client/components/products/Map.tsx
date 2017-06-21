
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as L from 'leaflet'
import 'leaflet-editable'
import 'leaflet-fullscreen'

import { config } from '../../config/config'
import { Query } from '../models/Query'
import { GetProductsResult, Product } from '../../../app.server/handlers/products/models'
import { flatMap } from '../../../app.shared/util'
import { bboxFlatArrayToCoordArray } from '../../../app.shared/util'

interface MapProps {
  query: Query;
  result: GetProductsResult
  hovered: Product | undefined
  productHovered: (product: Product) => void
  productUnhovered: (product: Product) => void
  queryChanged: (query: Query) => void
}

export class Map extends React.Component<MapProps, {}> {

  map: L.Map
  footprintLayerGroup: L.LayerGroup
  visualLayerGroup: L.LayerGroup

  // tuples of { product, footprint, wms }
  // associating a product with its corresponding leaflet map objects
  productTuples: { product: Product,
                   footprint: L.GeoJSON,
                   wms: L.TileLayer.WMS | undefined }[] = []

  render() {
    // react has nothing to do with the leaflet map; all events will be handled manually
    return <div className='map'></div>
  }

  componentDidMount() {
    this.createLeafletMap()
  }

  componentDidUpdate(prevProps: MapProps) {
    // if the query result has changed, update the items on the map
    if (prevProps.result != this.props.result) {
      this.updateProductList()
      this.addProductsToMap()
      this.addCollectionsToMap()
    }
    // if the currently hovered product has changed, update the footprint style
    if (prevProps.hovered != this.props.hovered) {
      this.updateHoveredProductOnMap(prevProps.hovered, this.props.hovered)
    }
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
      editable: true, // enable leaflet.editable plugin
    })

    // enable leaflet.fullscreen plugin
    new L.Control.Fullscreen({ position: 'topright' }).addTo(map)

    map.setView(config.map.defaultCenter, config.map.defaultZoom)

    // add layer groups
    this.footprintLayerGroup = L.layerGroup([]).addTo(map)
    this.visualLayerGroup = L.layerGroup([]).addTo(map)

    // add the bbox rectangle
    let bboxRect = L.rectangle(bboxFlatArrayToCoordArray(this.props.query.bbox), { fillOpacity: 0 })
    bboxRect.addTo(map)
    bboxRect.enableEdit() // enable a moveable bbox with leaflet.editable

    // update the query state when the bbox is altered
    map.on('editable:vertex:dragend', (e: any) => {
        if (e.layer === bboxRect) { // e.layer property added by leaflet.editable
          let b = bboxRect.getBounds()
          let bbox = [b.getWest(), b.getSouth(), b.getEast(), b.getNorth()]
            .map(roundTo3Decimals)
          this.props.queryChanged(Object.assign({}, this.props.query, { bbox: bbox }))
        }
    })
  }

  updateProductList() {
    // just make a brand new list (sufficient for now)
    this.productTuples = flatMap(this.props.result.collections, c => c.products)
      .map(p => ({
        product: p,
        footprint: this.makeProductFootprintLayer(p),
        wms: this.makeProductWmsLayer(p),
      }))
  }

  addProductsToMap() {
    // clear any layers and re-add them
    this.footprintLayerGroup.clearLayers()
    this.visualLayerGroup.clearLayers()

    this.productTuples.forEach(x => {
      if (x.footprint) {
        this.footprintLayerGroup.addLayer(x.footprint)
      }
      if (x.wms) {
        this.visualLayerGroup.addLayer(x.wms)
      }
    })
  }

  addCollectionsToMap() {
    // todo: we will probably need a way for the user to turn collection-level
    // WMS layers on and off rather than just showing them all
    this.props.result.collections.forEach(c => {
      if (c.data.wms) {
        let wmsUrl = c.data.wms.base_url
        let wmsOptions = {
          layers: c.data.wms.name,
          format: 'image/png',
          transparent: true
        }
        let layer = L.tileLayer.wms(wmsUrl, wmsOptions)
        this.visualLayerGroup.addLayer(layer)
      }
    })
  }

  makeProductFootprintLayer(p: Product) {

    let footprint = L.geoJSON(p.footprint, productFootprintStyleOff)

    footprint.on('mouseout', () => {
      footprint.setStyle(() => productFootprintStyleOff)
      this.props.productUnhovered(p)
    })

    footprint.on('mouseover', () => {
      footprint.setStyle(() => productFootprintStyleOn)
      this.props.productHovered(p)
    })

    return footprint
  }

  makeProductWmsLayer(p: Product) {

    if (p.data.wms) {

      let wmsOptions = {
        layers: p.data.wms.name,
        format: 'image/png',
        transparent: true
      }

      return L.tileLayer.wms(p.data.wms.base_url, wmsOptions)
    }
    else {
      return undefined
    }
  }

  updateHoveredProductOnMap(prev: Product | undefined, current: Product | undefined) {
    // highlight the currently hovered product
    let hoveredTuple = this.productTuples.find(x => x.product === current)
    if (hoveredTuple) {
      hoveredTuple.footprint.setStyle(() => productFootprintStyleOn)
    }
    // unhighlight the previously hovered product
    if (prev) {
      let unhoveredTuple = this.productTuples.find(x => x.product === prev)
      if (unhoveredTuple) {
        unhoveredTuple.footprint.setStyle(() => productFootprintStyleOff)
      }
    }
  }
}

// can't get className to work right now, so use literal styles
const productFootprintStyleOff = { fillOpacity: 0, weight: 1, color: '#666' }
const productFootprintStyleOn =  { fillOpacity: 0, weight: 3, color: '#555' }

/** Rounds the number to 3 decimal places. */
const roundTo3Decimals = (n: number) => Math.round(1000 * n) / 1000
