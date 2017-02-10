
import * as React from "react";

import { Header } from "./Header";
import { Form } from "./Form";
import { List } from "./List";
import { Map } from "./Map";
import { Summary } from "./Summary";
import { Query } from "./models/Query";
import { Product } from "./models/Product";

interface MainProps {
  query:    Query;   // the current query
  products: Product[]; // the most recently loaded query results (ordering corresponds to map z-index)
  queryChanged: (query: Query) => void;
}

export function Main(props: MainProps) {

  let handleGetLinkClicked = () => {};

  return (
    <div>
      <Header />
      <div className="container-fluid"  >
        <div className="row">
          <div className="col-md-5">
            <Map scenes={props.products} />
          </div>
          <div className="col-md-7">
            <h1>Sentinel / Node</h1>
            <br />
            <Form query={props.query} queryChanged={props.queryChanged} />
            <List scenes={props.products} />
          </div>
        </div>
      </div>
      <Summary scenes={props.products} getLinkClicked={handleGetLinkClicked} />
    </div>
  );
}

