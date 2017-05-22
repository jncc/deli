
import * as React from "react";
import * as ReactModal from "react-modal";
import { Container, Grid } from 'semantic-ui-react'

import { flatMap } from "../../../app.shared/util";

import { Head } from "../shared/Head";
import { Foot } from "../shared/Foot";
import { Form } from "./Form";
import { List } from "./List";
import { Map } from "./Map";
import { Summary } from "./Summary";
import { Query } from "../models/Query";
import { GetProductsResult, Product } from "../../../app.server/handlers/products/models";

interface LayoutProps {
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

export function Layout(props: LayoutProps) {

  let handleGetLinkClicked = () => {
    props.modalToggled()
};

  return (
    <div>
      <Head />
      <Container fluid>
        <Grid>
          <Grid.Column width={6}>
            <Map
              query={props.query}
              result={props.result}
              hovered={props.hovered}
              queryChanged={props.queryChanged}
              productHovered={props.productHovered}
              productUnhovered={props.productUnhovered}  />
          </Grid.Column>
          <Grid.Column width={10}>
            <Form
              query={props.query}
              queryChanged={props.queryChanged}
              result={props.result}
              />
            <List
              products={flatMap(props.result.collections, c => c.products)}
              hovered={props.hovered}
              productHovered={props.productHovered}
              productUnhovered={props.productUnhovered}
              />
          </Grid.Column>
        </Grid>
      </Container>
      <Foot />
    </div>
  );
}
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


