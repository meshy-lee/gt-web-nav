import React, { Component } from 'react'
import './index.less'
import Online from './online'
import PreOnline from './pre_online'
import TestOnline from './test_online'
class DashboardIndex extends Component {
  render () {
    return (
      <div id='dashboard-container'>
        <Online/>
        <PreOnline/>
        <TestOnline/>
      </div>
    )
  }
  componentDidMount () {
    console.log(this.props.params.id)
  }
}
export default DashboardIndex
