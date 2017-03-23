
import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from 'react-router-dom';

import "promise/polyfill";
import "whatwg-fetch";

import { Home } from "./components/Home";
import { App } from "./components/App";

import "./styles/main.less";

ReactDOM.render(
  <Router>
    <div>
      <Route exact path="/" component={Home}/>
      <Route path="/app" component={App}/>
    </div>
  </Router>,
  document.getElementById('app')
);


const About = () => (
  <div>
    <h2>About</h2>
  </div>
)
