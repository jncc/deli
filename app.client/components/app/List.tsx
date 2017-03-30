
import * as React from "react";
import * as moment from "moment";
let FlipMove = require('react-flip-move');

import { Product } from "../models/Product";
import { formatBytes } from "../../utility/formatBytes";


interface ListProps {
  products: Product[];
  hovered: Product | undefined;
}

export function List(props: ListProps) {

  let rows = props.products.map(p => {
    return (
      <div key={p.id} className="item">
        <div className="item-left">
          <div>
            <div className={props.hovered === p ? 'hoveredx' : ''}>*</div>
          </div>
        </div>
        <div className="item-main">
          <div className="item-main-title">{p.title}</div>
          <div className="item-main-cell">
            {getPropertiesUI(p)}
          </div>



        </div>
        <div className="item-right">
              <span className="item-right-download-type">{p.data.download.type}</span>
              <br />
              <span>{formatBytes(p.data.download.size, 0)}</span>

        </div>
        <div className="item-right">
              <form method="get" action={p.data.download.url}>
                <button className="btn btn-default" type="submit">Download</button>
              </form>
        </div>
      </div>
    );
  });

  return (
    <div>
      <FlipMove {...flipMoveAnimationProps}>
        {rows}
      </FlipMove>
    </div>
  );
}

function getPropertiesUI(p: Product) {
  return Object.keys(p.properties).map((key) => {
    let value = p.properties[key];
    let displayValue = key.endsWith("date")
      ? moment(value).format("D MMM YYYY")
      : value;
    return (
      <span>
        <span className="item-main-property-label">{key}</span>
        <span className="item-main-property-value">{displayValue}</span>
      </span>);
    });
}

let flipMoveAnimationProps = {
  duration: 200,
  enterAnimation: "fade",
  leaveAnimation: "accordianVertical",
  staggerDurationBy: 25,
};
