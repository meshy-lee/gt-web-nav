import React, { Component } from 'react'
// import Topbar from './components/topbar/index'
// import MenuPanel from './components/menu/views/menu_panel'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import * as actions from './store/actions'
// import PageRouter from './router/router'
class App extends Component {
  componentWillMount () {
    this.props.fetchBusinessLine()
  }
  render () {
    return (
      <div className="App">
        <div>{this.props.children}</div>
      </div>
    )
  }
}

// Counter.defaultProps = {
//   propInitVal: 100,
//   captain: 'test'
// }
App.propTypes = {
  fetchBusinessLine: PropTypes.func.isRequired
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchBusinessLine: () => {
      dispatch(actions.fetchBusinessLine())
    }
  }
}
export default connect(null, mapDispatchToProps)(App)

// export default App
