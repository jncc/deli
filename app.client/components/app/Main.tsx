
import * as React from "react";
import * as ReactModal from "react-modal";

import { flatMap } from "../../../app.shared/util";

import { Header } from "../shared/Header";
import { Footer } from "../shared/Footer";
import { Form } from "./Form";
import { List } from "./List";
import { Map } from "./Map";
import { Summary } from "./Summary";
import { Query } from "../models/Query";
import { GetProductsResult, Product } from "../../../app.server/handlers/products/models";

interface MainProps {
  query:    Query;   // the current query
  result: GetProductsResult;
  hovered: Product | undefined;
  modal: boolean;
  queryChanged: (query: Query) => void;
  productHovered: (product: Product) => void;
  productUnhovered: (product: Product) => void;
  modalToggled: () => void;
  wmsLink: string;
}

export function Main(props: MainProps) {

  let handleGetLinkClicked = () => {
    props.modalToggled()
};

  return (
    <div>
      <Header />
      <div className="container-fluid"  >
        <div className="row">
          <div className="col-md-5">
            <Map query={props.query} result={props.result} queryChanged={props.queryChanged} productHovered={props.productHovered} productUnhovered={props.productUnhovered}  />
          </div>
          <div className="col-md-7">
            {/*<Form query={props.query} queryChanged={props.queryChanged} />*/}
            <List
              products={flatMap(props.result.collections, c => c.products)}
              hovered={props.hovered} />
          </div>
        </div>
      </div>
      {/*<Summary products={props.products} getLinkClicked={handleGetLinkClicked} />*/}
      {/*<ReactModal
           isOpen={props.modal}
           contentLabel="Minimal Modal Example"
           style={ { style: { overlay: {zIndex: 3000000}}}}
        >
          <h2>Custom WMS link</h2>
          <p><span>http://deli-live.eu-west-1.elasticbeanstalk.com/wms/{props.wmsLink}</span></p>
          <p>Copy this WMS link into your GIS client.</p>
          <button onClick={() => props.modalToggled()}>OK</button>
      </ReactModal>*/}
      <Footer />
    </div>
  );
}

