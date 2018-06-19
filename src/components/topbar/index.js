import React, {Component} from 'react'
import { browserHistory } from 'react-router'
import img from './../../assets/image/gt.png'
import './topbar.less'
import {connect} from 'react-redux'
import cl from 'classnames'
import PropTypes from 'prop-types'
import {ModalWrap} from './../../index'
import BusinessMainModal from '@/page/business_line/businessMainModal'
import * as actions from '@/store/actions'
import {deleteBusinessLine} from '@/api/business_line'
class Topbar extends Component {
  constructor () {
    super(...arguments)
    this.state = {
      currentId: Number(window.location.hash.split('/')[2])
    }
    this.componentAttr = {}
    this.increase = this.increase.bind(this)
    this.deleted = this.deleted.bind(this)
    this.initRouteInfo.apply(this)
    this.shake = this.shake.bind(this)
  }
  initRouteInfo () {
    const routeInfo = browserHistory.getCurrentLocation().pathname.split('/')
    if (routeInfo.length > 2) {
      this.componentAttr.currentId = Number(routeInfo[2])
    }
  }
  increase () {
    this.$modalWrap({data: this.props.data, action: 'add'}, BusinessMainModal).then(() => {
      this.props.fetchBusinessLine()
    }, res => {})
  }
  deleted (target, cancel) {
    this.$comfirm({
      message: `确认删除${target.name}？`
    }).then(res => {
      deleteBusinessLine({id: target.id}).then(res => {
        this.$toast({
          type: 'success',
          message: res.msg || '删除成功!'
        })
        cancel()
        this.props.fetchBusinessLine()
      }, errRes => {})
    }, errRes => {})
  }
  update (ev, target) { // 费解 阻止不鸟默认事件。
    ev.preventDefault()
    ev.stopPropagation()
    this.$modalWrap({data: target, action: 'update', deleted: this.deleted}, BusinessMainModal).then(() => {
      this.props.fetchBusinessLine()
    }, res => {})
    return false
  }
  shake (obj, attr) {
    let arr = [] // 这个是抖动数值的数组
    for (let j = 14; j > 0; j -= 2) {
      arr.push(j, -j)
    }

    clearInterval(obj.timer)

    obj.style.left = 0 + 'px' // 先恢复到初始位置
    let num = 0
    obj.timer = setInterval(function () {
      obj.style.left = arr[num] + 'px'
      num++
      if (num === arr.length) {
        clearInterval(obj.timer)
        obj.style.left = 0 + 'px' // 清除定时器 同时恢复到初始位置
      }
    }, 16)
  }
  componentDidMount () {
    window.onhashchange = () => { // 暂用hash来做
      this.setState({
        currentId: Number(window.location.hash.split('/')[2])
      })
    }
  }
  render () {
    const id = this.state.currentId
    return (
      <header className="common-top-bar-box clear">
        <div className="fl header-left-side">
          <img onMouseEnter={(ev) => { return this.shake(ev.target) }} ref="logo" className="logo" src={img} title="珍爱生命，请使用chrome！"/>
          <div className="tip">
            <div className="arrow-left arrow-box">
              <b className="left">
                <i className="left-arrow1"></i>
                <i className="left-arrow2"></i>
              </b>
            </div>
            <div className="tip-content">
              <p>可以使用右键点击单元格进行查看账号密码、编辑、删除！</p>
            </div>
          </div>
        </div>
        <div className="fr header-right-side">
          <div className="group-list-box">
            <div className="group-list-wrap">
              <ul className="group-list">
                {
                  this.props.data.map((ele, index) => {
                    return (<li key={index} className={ele.id === id ? 'active' : ''} onContextMenu={(ev) => {
                      this.update(ev, ele)
                    }}>
                      <a href={'#/bussinessLine/' + ele.id + '/dashboard'}>
                        <img src={ele.url}/>
                        <span className="gt-menu__txt">{ele.name}</span>
                      </a>
                    </li>)
                  })
                }
              </ul>
            </div>
          </div>
          <button className="increase-group-btn" onClick={this.increase}>新增</button>
        </div>
      </header>
    )
  }
}

const mapStateToProps = (state) => {
  return {...state.globalReducer}
}
Topbar.propTypes = {
  fetchBusinessLine: PropTypes.func.isRequired
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchBusinessLine: () => {
      dispatch(actions.fetchBusinessLine())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Topbar)
