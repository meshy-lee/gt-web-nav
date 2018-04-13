import React, { Component } from 'react'
import Online from './online'
import PreOnline from './pre_online'
import TestOnline from './test_online'

import './index.less'

class DashboardIndex extends Component {
  render () {
    return (
      <div id='dashboard-container'>
        <div className='unit-group'>
          <div className='unit-header'>
            <h3>人间炼狱
              <a className="fr gt-btn-line gt--primary">
                <i className="gt-icon icon-add"></i>
                  带图标
              </a>
            </h3>
          </div>
          <div className='unit-body'>
            <Online/>
            <PreOnline/>
            <TestOnline/>
          </div>
        </div>
      </div>
    )
  }
  componentDidMount () {
    console.log(this.props.params.id)
  }
}
export default DashboardIndex
