
import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Home } from './components/home/Home';
import { Collections } from './components/collections/Collections';
import { Deli } from './components/deli/Deli';
import { DevWmsModalButton } from './components/shared/WmsModalButton'

export const Routes = (
  <Router>
    <div>
      <Route exact path='/' component={Home} />
      <Route exact path='/collections' component={Collections} />
      <Route exact path='/app' component={Deli} />
    </div>
  </Router>
);
