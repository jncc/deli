
import * as React from "react";
import * as moment from "moment";
let FlipMove = require('react-flip-move');

import { Product } from "../../../app.server/handlers/products/models";
import { formatBytes } from "../../utility/formatBytes";

interface ListProps {
  products: Product[];
  hovered: Product | undefined;
  productHovered: (product: Product) => void;
  productUnhovered: (product: Product) => void;
}

export function List(props: ListProps) {

  let rows = props.products
    .map(p => {
      return (
        <div key={p.id} className="item" onMouseOver={() => props.productHovered(p)} onMouseOut={() => props.productUnhovered(p)}>
          <div className={`item-hilite ${props.hovered && props.hovered.id == p.id ? 'item-hilite-hovered' : ''}`}>
          </div>
          <div className="item-main">
            <div className="item-main-title">{p.title}</div>
            <div className="item-main-cell">
              {getPropertiesUI(p)}
            </div>
          </div>
          {getDownloadTypeUI(p)}
          {getDownloadButtonUI(p)}
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
    }
  );
}

function getDownloadTypeUI(p: Product) {
  if (p.data.download) {
    return (
      <div className="item-right">
            <span className="item-right-download-type">{p.data.download.type}</span>
            <br />
            <span>{formatBytes(p.data.download.size, 0)}</span>
      </div>
    );
  }
  else {
    return (<div />);
  }
}

function getDownloadButtonUI(p: Product) {
  if (p.data.download) {
    return (
      <div className="item-right">
            <form method="get" action={p.data.download.url}>
              <button className="btn btn-default" type="submit">
                <span className="btn-glyphicon glyphicon glyphicon-download-alt"></span>
                Download
              </button>
            </form>
      </div>
    );
  }
  else {
    return (<div />);
  }
}

let flipMoveAnimationProps = {
  duration: 200,
  enterAnimation: "fade",
  leaveAnimation: "accordianVertical",
  staggerDurationBy: 25,
};
