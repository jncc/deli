
import * as React from "react";
import * as qs from "query-string";

import { Main } from "./Main";
import { Query, defaultQuery } from "../models/Query";
import { Product } from "../models/Product";
import { GetProductsResult } from "../../../app.server/handlers/products/models"

interface AppState {
  query:    Query;     // the current query
  products: Product[]; // the most recently loaded query results (ordering corresponds to map z-index)
  hovered: Product | undefined;
  modal: boolean;
  wmsLink: string;
}

export class App extends React.Component<any, AppState> {

  constructor(props: any) {
    super(props);
    this.state = {
      query: defaultQuery(),
      products: new Array(),
      hovered: undefined,
      modal: false,
      wmsLink: "" };
  }

  render() {
    return ( <Main {...this.state}
      queryChanged={this.handleQueryChange.bind(this)}
      productHovered={this.handleProductHovered.bind(this)}
      modalToggled={this.handleModalToggled.bind(this)} /> );
  }

  handleQueryChange(query: Query) {
    this.setState({ query: query });
    this.getData(query);
  }

  handleProductHovered(product: Product) {
    this.setState({ hovered: product });
  }

  handleModalToggled () {
    this.setState({ modal: !this.state.modal });
    this.getWmsLink();
  }

  // handleOpenModal () {
  //   this.setState({ modal: true });
  // }

  // handleCloseModal () {
  //   this.setState({ modal: false });
  // }

  componentDidMount() {
    // get initial data
    this.getData(this.state.query);
  }

  // componentDidUpdate(prevProps, prevState) {
  //   console.log(this.state.query);
  // }

  // fetch products data and set state
  getData(query: Query) {

    fetch('/api/products?' + qs.stringify(query))
      .then(res => res.json()
        .then((r: GetProductsResult) => {
          this.setState({ products: r.collections[0].products }); // todo support multiple collections
        })).catch(ex => {
          console.log(`couldn't get data`, ex);
        });
  }

  getWmsLink() {
    fetch('/api/storedQueries', {
      method: 'post',
      body: JSON.stringify(this.state.query),
      headers: { "Content-Type" : "application/json" }
    })
      .then(res => res.json()
        .then((json: { key: string }) => {
          this.setState({ wmsLink: json.key });
        }).catch(ex => {
          console.log(`couldn't get data`, ex);
        }));
  }
}
