
import * as React from "react";
import * as moment from "moment";
let FlipMove = require('react-flip-move');

import { Product } from "./models/Product";


interface ListProps {
  scenes: Product[];
  hovered: Product | undefined;
}

export function List(props: ListProps) {

  let rows = props.scenes.map(p => {
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
              <span className="item-right-download-type">{p.representations.download.type}</span>
              <br />
              <span>{formatBytes(p.representations.download.size, 0)}</span>

        </div>
        <div className="item-right">
              <form method="get" action={p.representations.download.url}>
                <button className="btn btn-default" type="submit">Download</button>
              </form>

          <div>
            <div>
            </div>
          </div>
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

// http://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript
function formatBytes(bytes,decimals) {
   if(bytes == 0) return '0 Bytes';
   var k = 1000,
       dm = decimals + 1 || 3,
       sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
       i = Math.floor(Math.log(bytes) / Math.log(k));
   return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

let flipMoveAnimationProps = {
  duration: 200,
  enterAnimation: "fade",
  leaveAnimation: "accordianVertical",
  staggerDurationBy: 25,
};
