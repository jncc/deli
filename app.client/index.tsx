
import * as React from "react";
import * as ReactDOM from "react-dom";

import "promise/polyfill";
import "whatwg-fetch";

import { App } from "./components/App";
import "./styles/main.less";

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
