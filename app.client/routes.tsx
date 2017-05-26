
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Home } from './components/home/Home';
import { Collections, DevWmsModal } from './components/collections/Collections';
import { Deli } from './components/deli/Deli';


export const Routes = (
  <Router>
    <div>
      <Route exact path='/' component={Collections}/>
      <Route exact path='/collections' component={Collections}/>
      <Route exact path='/app' component={Deli}/>
    </div>
  </Router>
);
