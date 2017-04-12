
import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Home } from "./components/home/Home";
import { App } from "./components/app/App";
import { Collections } from "./components/collections/Collections";


export const Routes = (
  <Router>
    <div>
      <Route exact path="/" component={App}/>
      <Route exact path="/collections" component={Collections}/>
      <Route exact path="/app" component={App}/>
    </div>
  </Router>
);
