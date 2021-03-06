import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import PageRouter from './router/router'

import './gt_entry'
import registerServiceWorker from './registerServiceWorker'

import {Provider} from 'react-redux'
import store from './store/store'
import './components/index'

ReactDOM.render(
  <Provider store={store}>
    <PageRouter/>
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker()
