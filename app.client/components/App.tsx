
import * as React from "react";

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

    this.getData();
  }

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(this.state.query);
  }

  gotData(products: any) {
    this.setState({ query: this.state.query, products: products });
  }

  getData() {

    // todo unparse properly!
    //queryString.stringify(this.state.query as any))
    let dataset = "dataset=s2-ard";
    let bbox = `bbox=[${this.state.query.bbox[0]},${this.state.query.bbox[1]},${this.state.query.bbox[2]},${this.state.query.bbox[3]}]`;
    let start = `start=` + this.state.query.start;
    let end = `end=` + this.state.query.end;
    fetch('/products?' + dataset + '&' + bbox + '&' + start + '&' + end)
      .then(res => res.json())
      .then(json => {
        this.gotData(json);
      }).catch(ex => {
        console.log('parsing failed', ex);
      });
  }
}

