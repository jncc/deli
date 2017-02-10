
import * as React from "react";
import * as moment from "moment";
let FlipMove = require('react-flip-move');

import { Product } from "./models/Product";


interface ListProps {
  scenes: Product[];
}

export function List(props: ListProps) {

  let rows = props.scenes.map(p => {
    return (
      <div key={p.id} className="item">
        <div className="item-left">
          <div>
            <div>X</div>
          </div>
        </div>
        <div className="item-main">
          <div className="item-main-title">{p.title}</div>
          <div className="item-main-cell">{moment(p.properties.capturedate).format("D MMM YYYY")}</div>
        </div>
        <div className="item-right">
          <div>
            <div>X</div>
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

let flipMoveAnimationProps = {
  duration: 200,
  enterAnimation: "fade",
  leaveAnimation: "accordianVertical",
  staggerDurationBy: 25,
};
