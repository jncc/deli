
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider as ReduxProvider } from 'react-redux'
import { CookiesProvider } from 'react-cookie';

// support es5 browsers such as IE11
import 'es6-shim' // polyfill to support es6 methods and functions
import 'whatwg-fetch' // polyfill to support 'fetch'

// import stylesheets so webpack can package them
import './styles/main.less'
import './styles/config'

import { Routes } from './routes'
import { store } from './state/store'

ReactDOM.render(
  <CookiesProvider>
    <ReduxProvider store={store}>{Routes}</ReduxProvider>
  </CookiesProvider>,
  document.getElementById('app')
)
