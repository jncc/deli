
import * as React from "react";
import * as qs from "query-string";

import { Main } from "./Main";
import { Query, defaultQuery } from "./models/Query";
import { Product } from "./models/Product";


interface AppState {
  query:    Query;     // the current query
  products: Product[]; // the most recently loaded query results (ordering corresponds to map z-index)
}

export class App extends React.Component<any, AppState> {

  constructor(props: any) {
    super(props);
    this.state = { query: defaultQuery(), products: new Array() };
  }

  render() {
    return ( <Main {...this.state} queryChanged={this.handleQueryChange.bind(this)} /> );
  }

  handleQueryChange(query: Query) {
    // update state.query
    this.setState({ query: query, products: this.state.products });

    this.getData(query);
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
        this.setState({ query: this.state.query, products: json });
      }).catch(ex => {
        console.log(`couldn't get data`, ex);
      });
  }

}
