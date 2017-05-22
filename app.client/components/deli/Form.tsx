
import * as React from "react";

import { Query } from "../models/Query";
import { GetProductsResult, Product } from "../../../app.server/handlers/products/models";

interface FormProps {
  query: Query;
  queryChanged: (query: Query) => void;
  result: GetProductsResult;
}

export function Form(props: FormProps) {

  let startChanged = (e: any) => {
    props.query.start = e.target.value;
    props.queryChanged(props.query);
  }

  let endChanged = (e: any) => {
    props.query.end = e.target.value;
    props.queryChanged(props.query);
  }

  let bboxChanged = (e: any) => {
    props.query.bbox = JSON.parse(e.target.value);
    props.queryChanged(props.query);
  }

  return (
    <div>
      <div>
        Collection '{props.result.collections[0].metadata.title}'
      </div>
      <div className="">
        <label>From</label>
        <input type="text" value={props.query.start} onChange={startChanged} className="" placeholder="Start date"></input>
      </div>
      <div className="">
        <label>To</label>
        <input type="text" value={props.query.end} onChange={endChanged} className="" placeholder="End date"></input>
      </div>
      <div className="">
        <label>Area</label>
        <input type="text" value={JSON.stringify(props.query.bbox)} onChange={bboxChanged} className="" placeholder="Bbox"></input>
      </div>
      <button className="">Update</button>
    </div>
  );
}

