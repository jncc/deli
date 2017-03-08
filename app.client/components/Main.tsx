
import * as React from "react";
import * as ReactModal from "react-modal";
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
  hovered: Product | undefined;
  modal: boolean;
  queryChanged: (query: Query) => void;
  productHovered: (product: Product | undefined) => void;
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
            <Map scenes={props.products} productHovered={props.productHovered} />
          </div>
          <div className="col-md-7">
            <h1>EO Collaboration Platform</h1>
            <br />
            <Form query={props.query} queryChanged={props.queryChanged} />
            <List scenes={props.products} hovered={props.hovered} />
          </div>
        </div>
      </div>
      <Summary products={props.products} getLinkClicked={handleGetLinkClicked} />
      <ReactModal
           isOpen={props.modal}
           contentLabel="Minimal Modal Example"
           style={ { style: { overlay: {zIndex: 3000000}}}}
        >
          <h2>Custom WMS link</h2>
          <p><span>http://deli-live.eu-west-1.elasticbeanstalk.com/wms/{props.wmsLink}</span></p>
          <p>Copy this WMS link into your GIS client.</p>
          <button onClick={() => props.modalToggled()}>OK</button>
      </ReactModal>
    </div>
  );
}

