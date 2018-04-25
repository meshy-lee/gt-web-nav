import React, { Component } from 'react'
import Online from './online'
import PreOnline from './pre_online'
import TestOnline from './test_online'
// import {ModalWrap} from '@/components/modal/modal_wrap/index'
import WebsiteModal from './websiteModal'
import {queryWebsiteList} from '@/api/website'
import './index.less'

class DashboardIndex extends Component {
  constructor () {
    super()
    this.addWebsite = this.addWebsite.bind(this)
  }
  addWebsite () {
    this.$modalWrap({data: {id: this.props.params.id}, actionType: 'add'}, WebsiteModal).then(res => {
      console.log(res)
    }, errRes => {
      console.log('cancel')
    })
  }
  render () {
    return (
      <div id='dashboard-container'>
        <div className='unit-group'>
          <div className='unit-header'>
            <h3>画笔描绘，艺术包围。
              <a className="fr gt-btn-line" onClick={this.addWebsite}>
                <i className="gt-icon icon-add"></i>新增
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
    // console.log(this.props.params.id)
    queryWebsiteList({id: this.props.params.id}).then(res => {
      // console.log(res)
    }, errRes => {

    })
  }
}
export default DashboardIndex
