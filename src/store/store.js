import {createStore, combineReducers, applyMiddleware, compose} from 'redux'

import thunkMiddleware from 'redux-thunk'

import globalReducer from './reducer'

// import Perf from 'react-addons-perf' // 16版本不支持

const win = window
// win.Perf = Perf

const reducer = combineReducers({globalReducer})

const middlewares = process.env.NODE_ENV !== 'production' ? [require('redux-immutable-state-invariant').default(), thunkMiddleware] : [thunkMiddleware]

const storeEnhancers = compose(applyMiddleware(...middlewares), (win && win.devToolsExtension)
  ? win.devToolsExtension()
  : (f) => f)

export default createStore(reducer, {}, storeEnhancers)
