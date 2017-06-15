
import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Home } from './components/home/Home';
import { Collections } from './components/collections/Collections';
import { Products } from './components/products/Products';
import { DevWmsModalButton } from './components/shared/WmsModalButton'

export const Routes = (
  <Router>
    <div>
      <Route exact path='/' component={Products} />
      <Route exact path='/collections' component={Collections} />
      <Route exact path='/app' component={Products} />
    </div>
  </Router>
);
