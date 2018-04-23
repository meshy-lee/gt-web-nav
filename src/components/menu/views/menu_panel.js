import React, {Component} from 'react'
import {connect} from 'react-redux'
import cl from 'classnames'
import PropTypes from 'prop-types'
import {ModalWrap} from './../../index'
import BusinessMainModal from '@/page/business_line/businessMainModal'
import * as actions from '@/store/actions'
import {deleteBusinessLine} from '@/api/business_line'
import './index.less'
// import { browserHistory } from 'react-router'
class MenuPanel extends Component {
  constructor () {
    super(...arguments)
    this.state = {
      edit: false
    }
    this.increase = this.increase.bind(this)
    this.edit = this.edit.bind(this)
    this.deleted = this.deleted.bind(this)
    // console.dir(browserHistory)
  }
  increase () {
    this.$modalWrap({data: this.props.data, actionType: 'add'}, BusinessMainModal).then(() => {
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
      message: '确认删除该分组？'
    }).then(res => {
      deleteBusinessLine({id: target.id}).then(res => {
        console.log(res)
      }, errRes => {
        console.log(res)
      })
    }, errRes => {
      console.log(errRes)
    })
  }
  update () {
    this.$comfirm({
      message: '确认删除该分组？'
    })
  }
  render () {
    let menuClass = 'gt-bar'
    // console.log(this.props.status)
    if (this.props.status === 'success') menuClass = 'gt-bar gt-bar-in'
    if (this.state.edit) menuClass += ' bar-edit'
    // if (this.props.data.length)
    // var menuItem = cl({
    //   btn: true,
    //   'btn-pressed': this.state.isPressed,
    //   'btn-over': !this.state.isPressed && this.state.isHovered
    // })
    // console.log(menuItem)
    // <div className="shake shake-horizontal shake-constant"></div>
    // console.log(console.log(this.props))
    return (
      <div className={menuClass}>
        <div className='business-add-wrap'>
          <a className="gt-btn-line gt--large gt--primary" onClick={this.increase}><i className="gt-icon icon-add"></i></a>
        </div>
        <div className="gt-menu-wrap">
          <ul className="gt-menu">
            {
              this.props.data.map((ele, index) => {
                return (<li className="gt-menu-cell" key={index}>
                  <a href={'/bussinessLine/' + ele.id + '/dashboard'} className="gt-menu__hd">
                    <img src={ele.url}/>
                    <span className="gt-menu__txt">{ele.name}</span>
                  </a>
                  <div className="control-box">
                    <div className="update-edit-wrap">
                      <button className="update-btn" type='button' onClick={this.update.bind(this)}>更新</button>
                    </div>
                    <div className="delete-edit-wrap">
                      <button className="delete-btn" type='button' onClick={this.deleted.bind(this, ele)}>删除</button>
                    </div>
                  </div>
                </li>)
              })
            }
          </ul>
        </div>
        <div className="menu-edit" onClick={this.edit}>
          <a href="javaScript:;">编辑</a>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {...state.globalReducer}
}
MenuPanel.propTypes = {
  fetchBusinessLine: PropTypes.func.isRequired
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchBusinessLine: () => {
      dispatch(actions.fetchBusinessLine())
    }
  }
}
// MenuPanel.propTypes = {
//   status: PropTypes.string.isRequired,
//   cityName: PropTypes.string
// }

export default connect(mapStateToProps, mapDispatchToProps)(MenuPanel)
