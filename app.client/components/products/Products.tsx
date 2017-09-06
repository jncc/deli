
import * as React from 'react'
import * as _ from 'lodash'
import * as qs from 'query-string'

import { config } from '../../config/config'
import { Layout } from './Layout'
import { Query } from '../models/Query'
import { GetProductsResult, Product } from '../../../app.server/handlers/products/models'
import { ensureArray } from '../../../app.shared/util'
import { S2_SCENE_NAMES } from "../../utility/S2_SCENE_NAMES";

interface ProductsState {
  query:    Query     // the current query
  result:   GetProductsResult
  hovered:  Product | undefined
  selected: Product[]
  wmsLink:  string
  pending:  number // requests waiting for the network
}

export class Products extends React.Component<any, ProductsState> {

  constructor(props: any) {
    super(props)
    this.state = {
      query:    config.defaultQuery,
      result:   { collections: [], query: config.defaultQueryResultInfo },
      hovered:  undefined,
      selected: [],
      wmsLink:  '',
      pending:  0,
    }
  }

  render() {
    return ( <Layout {...this.state}
      queryChanged={this.handleQueryChange.bind(this)}
      productHovered={this.handleProductHovered.bind(this)}
      productUnhovered={this.handleProductUnhovered.bind(this)}
      productSelected={this.productSelected.bind(this)}
      getWmsLinkClicked={this.getWmsLink.bind(this)}
      />
    )
  }

  handleQueryChange(query: Query) {
    this.setState({ query: query })
    this.getData(query)
  }

  handleProductHovered(product: Product) {
    this.setState({ hovered: product })
  }

  handleProductUnhovered(product: Product) {
    this.setState((prevState: ProductsState, props) => {
      if (prevState.hovered == product) {
        return { hovered: undefined }
      } else {
        return { }
      }
    })
  }

  productSelected(product: Product) {
    if (!this.state.selected.find(p => p === product)) {
      this.setState({ selected: this.state.selected.concat(product) })
    }
  }

  componentDidMount() {
    let query = this.updateQueryFromQuerystring(config.defaultQuery)

    this.setState({ query }, () => {
      // get initial data
      // this callback function is called by react when state has actually been set!
      this.getData(this.state.query)
    })
  }

  updateQueryFromQuerystring(query: Query) {
    if (location.hash) {
      console.log(location.hash)
      let s = location.hash.substr(location.hash.indexOf('?') + 1)
      console.log(s)
      let parsedQuery = qs.parse(s)
      console.log(parsedQuery)
      let collections = ensureArray(parsedQuery.collections)
      return Object.assign({}, query, { collections })
    }
    else {
      return query
    }
  }

  getData(query: Query) {
    this.setState((prev) => ({ pending: prev.pending + 1 }))
    fetch('/api/products?' + qs.stringify(query))
      .then(res => res.json()
        .then((r: GetProductsResult) => {
          // add customer-specific product properties that should be in the data
          _.flatMap(r.collections, c => c.products).map(this.addCustomerSpecificProductProperties)
          this.setState({ result: r })
          this.setState((prev) => ({ pending: prev.pending - 1 }))
        })).catch(ex => {
          this.setState((prev) => ({ pending: prev.pending - 1 }))
          console.log(`couldn't get data`, ex)
        })
  }

  getWmsLink() {
    fetch('/api/storedQueries', {
      method: 'post',
      body: JSON.stringify(this.state.query),
      headers: { 'Content-Type' : 'application/json' }
    })
      .then(res => res.json()
        .then((json: { key: string }) => {
          // todo: the server should return this link, not a key!
          let wmsLink = `http://deli-eocoe.eu-west-1.elasticbeanstalk.com/wms/${json.key}`
          this.setState({ wmsLink })
        }).catch(ex => {
          console.log(`couldn't get data`, ex)
        }))
  }

  addCustomerSpecificProductProperties = (p: Product) => {
    if (p.title.startsWith('LiDAR for Scotland')) {
      let matches = p.title.match(/D[TS]M ([A-Z]+[0-9]+)/)
      if (matches && matches.length > 1) {
        let gridsquare = matches[1]
        p.properties.gridsquare = gridsquare
      }
    }
    if (config.name === 'eocoe') {
      setEocoeProperties(p)
    }
    return p
  }
}

function setEocoeProperties(p: Product) {
  // todo: make this robust in the case of incorrect / missing row or orbit properties
  let orbit = p.properties.orbit
  let row = p.properties.row
  if (orbit !== undefined && row !== undefined) {
    let scene = (S2_SCENE_NAMES as any)[orbit][parseInt(row) - 1]
    // also, explicitly set the order of properties for usability
    p.properties = {
      scene: scene,
      orbit: p.properties.orbit,
      row: p.properties.row,
      capturedate: p.properties.capturedate,
    }
  }
}
