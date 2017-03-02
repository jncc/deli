
import * as React from "react";
import * as qs from "query-string";

import { Main } from "./Main";
import { Query, defaultQuery } from "./models/Query";
import { Product } from "./models/Product";


interface AppState {
  query:    Query;     // the current query
  products: Product[]; // the most recently loaded query results (ordering corresponds to map z-index)
  hovered: Product | undefined;
}

export class App extends React.Component<any, AppState> {

  constructor(props: any) {
    super(props);
    this.state = { query: defaultQuery(), products: new Array(), hovered: undefined };
  }

  render() {
    return ( <Main {...this.state}
      queryChanged={this.handleQueryChange.bind(this)}
      productHovered={this.handleProductHovered.bind(this)} /> );
  }

  handleQueryChange(query: Query) {
    this.setState({ query: query, products: this.state.products, hovered: this.state.hovered });
    this.getData(query);
  }

  handleProductHovered(product: Product) {
    this.setState({ hovered: product, query: this.state.query, products: this.state.products, });
  }


  componentDidMount() {
    // get initial data
    this.getData(this.state.query);
  }

  // componentDidUpdate(prevProps, prevState) {
  //   console.log(this.state.query);
  // }

  // fetch products data and set state
  getData(query: Query) {

    fetch('/products?' + qs.stringify(query))
      .then(res => res.json())
      .then(json => {
        this.setState({ query: this.state.query, hovered: this.state.hovered, products: json });
      }).catch(ex => {
        console.log(`couldn't get data`, ex);
      });
  }

}
