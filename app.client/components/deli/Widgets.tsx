
import * as React from "react";
import { Popup, PopupProps } from "semantic-ui-react";

/** A Semantic UI Popup, with defaults set for this app. */
export const Tooltip = (props: PopupProps) => {
  return <Popup
    inverted
    position='top center'
    {...props}
    />
};

