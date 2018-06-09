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
    this.state = {
      onlineList: [],
      preOnlineList: [],
      testOnlineList: []
    }
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
    const {onlineList, preOnlineList, testOnlineList} = this.state
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
            <Online onlineList={onlineList}/>
            <PreOnline preOnlineList={preOnlineList}/>
            <TestOnline testOnlineList={testOnlineList}/>
          </div>
        </div>
      </div>
    )
  }
  componentDidMount () {
    // console.log(this.props.params.id)
    queryWebsiteList({belong: this.props.params.id}).then(res => {
      const resData = res.data
      console.log(res.data)
      res.data.forEach(ele => {
        ele.accountList = JSON.parse(ele.accountList)
      })
      this.setState({
        onlineList: resData.filter(ele => ele.type === 0),
        preOnlineList: resData.filter(ele => ele.type === 1),
        testOnlineList: resData.filter(ele => ele.type === 2)
      })
      // console.log(this.state)
    }, errRes => {

    })
  }
}
export default DashboardIndex
