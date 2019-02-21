
import * as React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Home from './components/home/Home'
import { Collections } from './components/collections/Collections'
import { Products } from './components/products/Products'
import { Privacy } from './components/privacy/Privacy'
import Cookies from './components/cookies/Cookies'

import { DevWmsModalButton } from './components/shared/WmsModalButton'

export const Routes = (
  <Router>
    <div>
      <Route exact path='/' component={Home} />
      <Route exact path='/collections' component={Collections} />
      <Route exact path='/products' component={Products} />
      <Route exact path='/privacy' component={Privacy} />
      <Route exact path='/cookies' component={Cookies} />
    </div>
  </Router>
)
