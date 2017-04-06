
import * as React from "react";

import { config } from "../../config";

interface SummaryProps {
  productCount: number;
  getLinkClicked: () => void;
}


export function Summary(props: SummaryProps) {

  let getLinkClicked = (e: any) => {
    props.getLinkClicked();
  }

  let tooManyProducts = props.productCount > config.maxProductCount;

  let message = tooManyProducts
    ? (<span>More than <span className="summary-count">{config.maxProductCount}</span> products selected. Apply more filters.</span>)
    : (<span><span className="summary-count">{props.productCount}</span> products selected</span>);

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

