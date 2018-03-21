import React, {Component} from 'react'
import {Router, Route, IndexRedirect, browserHistory, IndexRoute} from 'react-router'
// import Box from './router_component/box'
import {connect} from 'react-redux'
import App from './../App'
const BussinessLine = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('./../page/business_line/index').default)
  }, 'bussinessLine')
}
const Dashboard = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('./../page/business_line/dashboard/index').default)
  }, 'Dashboard')
}
const NotFound = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('./../page/not_found/index').default)
  }, 'NotFound')
}
class PageRouter extends Component {
  render () {
    const init = this.props.init
    return (
      <Router history={browserHistory}>
        <Route name='App' path="/" component={App}>
          <IndexRedirect to="/bussinessLine" />
          <Route name='bussinessLine' path="bussinessLine" getComponent={BussinessLine}>
            <Route name='dashboard' path="/bussinessLine/:id/dashboard" getComponent={Dashboard}>
            </Route>
          </Route>
          <Route path="*" getComponent={NotFound}/>
        </Route>
      </Router>
    )
  }
}
function mapDispatchToProps (dispatch, ownProps) {
  return {
    // init: (flag) => {
    //   dispatch(action.getData())
    // }
  }
}

export default connect(null, mapDispatchToProps)(PageRouter)
