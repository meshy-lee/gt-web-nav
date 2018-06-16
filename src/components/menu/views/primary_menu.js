import React, {Component} from 'react'
import {connect} from 'react-redux'
import cl from 'classnames'
import PropTypes from 'prop-types'
import {ModalWrap} from './../../index'
import BusinessMainModal from '@/page/business_line/businessMainModal'
import * as actions from '@/store/actions'
import {deleteBusinessLine} from '@/api/business_line'

import './index.less'
import { browserHistory } from 'react-router'
class PrimaryMenu extends Component {
  constructor () {
    super(...arguments)
    this.state = {
      edit: false
    }
    this.componentAttr = {}
    this.increase = this.increase.bind(this)
    this.edit = this.edit.bind(this)
    this.deleted = this.deleted.bind(this)
    this.initRouteInfo.apply(this)
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
    }, res => {
      console.log('cancel')
    })
  }
  edit () {
    const edit = !this.state.edit
    this.setState({
      edit
    })
  }
  deleted (target) {
    this.$comfirm({
      message: `确认删除${target.name}？`
    }).then(res => {
      deleteBusinessLine({id: target.id}).then(res => {
        this.$toast({
          type: 'success',
          message: res.msg || '删除成功!'
        })
        this.props.fetchBusinessLine()
        console.log(res)
      }, errRes => {

      })
    }, errRes => {

    })
  }
  update (target) {
    this.$modalWrap({data: target, action: 'update'}, BusinessMainModal).then(() => {
      this.props.fetchBusinessLine()
    }, res => {
      console.log('cancel')
    })
  }
  render () {
    let menuClass = 'gt-bar'
    if (this.props.status === 'success') menuClass = 'gt-bar gt-bar-in'
    if (this.state.edit) menuClass += ' bar-edit'
    return (
      <div className={menuClass}>
        <div className="primary-menu-header">
          <button type="button" onClick={this.increase}>
            <i className="gt-icon icon-add"></i>
          </button>
        </div>
        <div className="primary-menu-body">
          <ul className="gt-menu">
            {
              this.props.data.map((ele, index) => {
                let menuItem = cl({
                  'gt-menu-cell': true,
                  'active': ele.id === this.componentAttr.currentId
                })
                return (<li className={menuItem} key={index}>
                  <a href={'/bussinessLine/' + ele.id + '/dashboard'} className="gt-menu__hd">
                    <img src={ele.url}/>
                    <span className="gt-menu__txt">{ele.name}</span>
                  </a>
                  <div className="control-box">
                    <div className="update-edit-wrap">
                      <button className="control-btn update-btn" type='button' onClick={this.update.bind(this, ele)}>更新</button>
                    </div>
                    <div className="delete-edit-wrap">
                      <button className="control-btn delete-btn" type='button' onClick={this.deleted.bind(this, ele)}>删除</button>
                    </div>
                  </div>
                </li>)
              })
            }
          </ul>
        </div>
        <footer className="primary-menu-footer" onClick={this.edit}>
          <a href="javaScript:;">编辑</a>
        </footer>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {...state.globalReducer}
}
PrimaryMenu.propTypes = {
  fetchBusinessLine: PropTypes.func.isRequired
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchBusinessLine: () => {
      dispatch(actions.fetchBusinessLine())
    }
  }
}
// PrimaryMenu.propTypes = {
//   status: PropTypes.string.isRequired,
//   cityName: PropTypes.string
// }

export default connect(mapStateToProps, mapDispatchToProps)(PrimaryMenu)
