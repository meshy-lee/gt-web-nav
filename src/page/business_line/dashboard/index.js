import React, { Component } from 'react'
import Online from './online'
import PreOnline from './pre_online'
import TestOnline from './test_online'
// import {ModalWrap} from '@/components/modal/modal_wrap/index'
import WebsiteModal from './websiteModal'
import {queryWebsiteList, deleteWebsite} from '@/api/website'
import './index.less'

class DashboardIndex extends Component {
  constructor () {
    super()
    this.state = {
      type: 0,
      onlineList: [],
      preOnlineList: [],
      testOnlineList: []
    }
    this.addWebsite = this.addWebsite.bind(this)
    this.updateWebsite = this.updateWebsite.bind(this)
    this.tabType = this.tabType.bind(this)
    this.fetchData = this.fetchData.bind(this)
    this.toTop = this.toTop.bind(this)
    this._Deleted = this._Deleted.bind(this)
  }
  tabType (ev) {
    this.setState({
      ...this.state,
      type: Number(ev.target.value)
    })
  }
  addWebsite () {
    this.$modalWrap({data: {belong: this.props.params.id}, action: 'add'}, WebsiteModal).then(res => {
      this.fetchData({belong: this.props.params.id})
    }, errRes => {
      console.log('cancel')
    })
  }
  updateWebsite (item) {
    this.$modalWrap({data: {...item}, action: 'update', deleted: this._Deleted}, WebsiteModal).then(res => {
      this.fetchData({belong: this.props.params.id})
    }, errRes => {
      console.log('cancel')
    })
  }
  _Deleted (target, cancel) {
    this.$comfirm({
      message: `确认删除${target.name}？`
    }).then(res => {
      deleteWebsite({id: target.id}).then(res => {
        this.$toast({
          type: 'success',
          message: res.msg || '删除成功!'
        })
        cancel()
        this.fetchData({belong: this.props.params.id})
      }, errRes => {})
    }, errRes => {})
  }
  fetchData (params, type) {
    queryWebsiteList(params).then(res => {
      const resData = res.data
      res.data.forEach(ele => {
        ele.accountList = JSON.parse(ele.accountList)
      })
      this.setState({
        type: 0,
        onlineList: resData.filter(ele => ele.type === 0),
        preOnlineList: resData.filter(ele => ele.type === 1),
        testOnlineList: resData.filter(ele => ele.type === 2)
      })
    }, errRes => {

    })
  }
  toTop () {
    this.parentDom.scrollTop = 0
  }
  componentWillReceiveProps (nextProps) {
    this.fetchData({belong: nextProps.params.id}, 0)
  }
  componentDidMount () {
    this.parentDom = document.getElementById('home-container')
    this.fetchData({belong: this.props.params.id})
  }
  render () {
    const {onlineList, preOnlineList, testOnlineList, type} = this.state
    let showComponent
    switch (type) {
      case 0:
        showComponent = <Online updateWebsite={this.updateWebsite} onlineList={onlineList}/>
        break

      case 1:
        showComponent = <PreOnline updateWebsite={this.updateWebsite} preOnlineList={preOnlineList}/>
        break

      default:
        showComponent = <TestOnline updateWebsite={this.updateWebsite} testOnlineList={testOnlineList}/>
        break
    }
    return (
      <div id='dashboard-container'>
        <div className="control-box">
          <ul className="control-list">
            <li className={type === 0 ? 'active' : ''}>
              <label>
                <input
                  checked={type === 0}
                  type="radio"
                  name="type"
                  value="0" onChange={this.tabType}/>
                <span>线网</span>
              </label>
            </li>
            <li className={type === 1 ? 'active' : ''}>
              <label>
                <input
                  checked={type === 1}
                  type="radio"
                  name="type"
                  value="1" onChange={this.tabType}/>
                <span>准线网</span>
              </label>
            </li>
            <li className={type === 2 ? 'active' : ''}>
              <label>
                <input
                  checked={type === 2}
                  type="radio"
                  name="type"
                  value="2" onChange={this.tabType}/>
                <span>测试网</span>
              </label>
            </li>
          </ul>
        </div>
        <div className='unit-group'>
          <div className='unit-body'>
            { showComponent }
          </div>
        </div>
        <div className="side-nav">
          <ul>
            <li onClick={this.toTop}>Top</li>
            <li onClick={this.addWebsite}><i className="gt-icon icon-add"></i></li>
          </ul>
        </div>
      </div>
    )
  }
}
export default DashboardIndex
