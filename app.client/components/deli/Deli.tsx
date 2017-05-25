
import * as React from 'react'
import * as qs from 'query-string'

import { config } from '../../config'
import { Layout } from './Layout'
import { Query } from '../models/Query'
import { GetProductsResult, Product } from '../../../app.server/handlers/products/models'
import { flatMap, ensureArray } from '../../../app.shared/util'

interface DeliState {
  query:   Query     // the current query
  result:  GetProductsResult
  hovered: Product | undefined
  modal:   boolean
  wmsLink: string
  pending: number // requests waiting for the network
}

export class Deli extends React.Component<any, DeliState> {

  constructor(props: any) {
    super(props)
    this.state = {
      query: config.defaultQuery,
      result: { collections: [] },
      hovered: undefined,
      modal: false,
      wmsLink: '',
      pending: 0,
    }
  }

  render() {
    return ( <Layout {...this.state}
      queryChanged={this.handleQueryChange.bind(this)}
      productHovered={this.handleProductHovered.bind(this)}
      productUnhovered={this.handleProductUnhovered.bind(this)}
      modalToggled={this.handleModalToggled.bind(this)} /> )
  }

  handleQueryChange(query: Query) {
    this.setState({ query: query })
    this.getData(query)
  }

  handleProductHovered(product: Product) {
    this.setState({ hovered: product })
  }
  handleProductUnhovered(product: Product) {
    this.setState((prevState: DeliState, props) => {
      if (prevState.hovered == product) {
        return { hovered: undefined }
      } else {
        return { } // think this is ok to make no changes
      }
    })
  }

  handleModalToggled () {
    this.setState({ modal: !this.state.modal })
    this.getWmsLink()
  }

  // handleOpenModal () {
  //   this.setState({ modal: true })
  // }

  // handleCloseModal () {
  //   this.setState({ modal: false })
  // }

  componentDidMount() {
    let query = this.updateQueryFromQuerystring(config.defaultQuery)

    this.setState({ query }, () => {
      // get initial data
      // this callback function is called by react when state has actually been set!
      this.getData(this.state.query)
    })
  }

  updateQueryFromQuerystring(query: Query) {
    if (location.search) {
      let parsedQuery = qs.parse(location.search)
      let collections = ensureArray(parsedQuery.collections)
      return Object.assign({}, query, { collections })
    }
    else {
      return query
    }
  }

  // fetch products data and set state
  getData(query: Query) {
    this.setState((prev) => ({ pending: prev.pending + 1 }))
    fetch('/api/products?' + qs.stringify(query))
      .then(res => res.json()
        .then((r: GetProductsResult) => {
          // add customer-specific product properties that should be in the data
          flatMap(r.collections, c => c.products).map(this.addCustomerSpecificProductProperties)
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
          this.setState({ wmsLink: json.key })
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
    return p
  }

}
