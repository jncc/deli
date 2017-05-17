
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from 'react-redux';

import "es6-shim";
//import "promise/polyfill";
import "whatwg-fetch";

import "./styles/main.less";
import "./styles/config.less";

import { Routes } from "./routes";
import { store } from './state/store';

ReactDOM.render(
    <Provider store={store}>{Routes}</Provider>,
    document.getElementById('app')
);
