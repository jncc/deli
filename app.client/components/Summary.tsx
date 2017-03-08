
import * as React from "react";

import { Product } from "./models/Product";

interface SummaryProps {
  products: Product[];
  getLinkClicked: () => void;
}

const MAX_SCENE_COUNT = 50;

export function Summary(props: SummaryProps) {

  let getLinkClicked = (e: any) => {
    props.getLinkClicked();
  }

  let tooManyProducts = props.products.length > MAX_SCENE_COUNT;

  let message = tooManyProducts
    ? (<span>More than <span className="summary-count">{MAX_SCENE_COUNT}</span> products selected. Apply more filters.</span>)
    : (<span><span className="summary-count">{props.products.length}</span> products selected</span>);

  return (
    <div className="summary">
    <div className="form-inline form pull-right">
      {message}
      <button className="btn btn-danger" disabled={tooManyProducts}
        onClick={getLinkClicked}>Get Link</button>
    </div>
    </div>
  );
}

