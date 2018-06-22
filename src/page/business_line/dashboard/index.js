import React, { Component } from 'react'
import SiteCells from './site_cells'
import WebsiteModal from './websiteModal'
import {queryWebsiteList, deleteWebsite} from '@/api/website'
import './index.less'

const easterEggs = [
  '秋刀鱼的滋味，喵和你都想了解。',
  '好想告诉我的她，这里像幅画~',
  '彩蛋送给有缘人~',
  '顶着大太阳，想为妳撑伞。',
  '每个人都很普通，哭哭啼啼来到尘世中~',
  '我听见雨滴落在青青草地，却听不见妳的声音。',
  '确定过眼神，我遇上对的人。',
  '橡树的绿芽呀，白色的竹篱笆。',
  '污？臂儿相兜，唇儿相凑，舌儿相弄。',
  '纵使举案齐眉，终究意难平。',
  '抽屉泛黄的日记，榨干了回忆，那笑容是夏季。',
  '缺氧过后的爱情，粗心的眼泪是多余。'
]
class DashboardIndex extends Component {
  constructor () {
    super()
    this.state = {
      type: 2,
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
      message: `确认删除 ${target.name} ？`
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
        type: 2,
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
    let siteCellList
    switch (type) {
      case 0:
        siteCellList = [...onlineList]
        break

      case 1:
        siteCellList = [...preOnlineList]
        break

      default:
        siteCellList = [...testOnlineList]
        break
    }
    let copyEasterEggs = [...easterEggs]
    siteCellList.forEach((ele, index) => {
      if (Math.random() * 10 >= 5) ele.title = copyEasterEggs.splice(Math.floor(Math.random() * copyEasterEggs.length), 1)[0]
    })
    return (
      <div id='dashboard-container'>
        <div className="control-box">
          <ul className="control-list">
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
          </ul>
        </div>
        <div className='unit-group'>
          <div className='unit-body'>
            <SiteCells updateWebsite={this.updateWebsite} siteCellList={siteCellList}/>
          </div>
        </div>
        <div className="side-nav">
          <ul>
            <li title="做上火箭，自己动~" onClick={this.toTop}>Top</li>
            <li title="相信你们不会发现彩蛋~" onClick={this.addWebsite}><i className="gt-icon icon-add"></i></li>
          </ul>
        </div>
      </div>
    )
  }
}
export default DashboardIndex
