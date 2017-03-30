
import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from 'react-router-dom';

import "promise/polyfill";
import "whatwg-fetch";

import { Home } from "./components/home/Home";
import { App } from "./components/app/App";
import { Collections } from "./components/collections/Collections";

import "./styles/main.less";
import "./styles/config.less";

ReactDOM.render(
  <Router>
    <div>
      <Route exact path="/" component={Home}/>
      <Route exact path="/collections" component={Collections}/>
      <Route exact path="/app" component={App}/>
    </div>
  </Router>,
  document.getElementById('app')
);

