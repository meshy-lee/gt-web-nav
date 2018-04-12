import React, {Component} from 'react'
import {connect} from 'react-redux'
import cl from 'classnames'
import PropTypes from 'prop-types'
import {ModalWrap} from './../../index'
import BusinessMainModal from '@/page/business_line/businessMainModal'
import * as actions from '@/store/actions'
import './index.less'
class MenuPanel extends Component {
  constructor () {
    super(...arguments)
    this.state = {
      edit: false
    }
    this.increase = this.increase.bind(this)
    this.edit = this.edit.bind(this)
    this.deleted = this.deleted.bind(this)
  }
  increase () {
    ModalWrap({data: this.props.data, actionType: 'add'}, BusinessMainModal).then(() => {
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
  deleted () {

  }
  render () {
    let menuClass = 'gt-bar'
    // console.log(this.props.status)
    if (this.props.status === 'success') menuClass = 'gt-bar gt-bar-in'
    if (this.state.edit) menuClass += ' bar-edit'
    // if (this.props.data.length)
    // var btnClass = cl({
    //   btn: true,
    //   'btn-pressed': this.state.isPressed,
    //   'btn-over': !this.state.isPressed && this.state.isHovered
    // })
    // <div className="shake shake-horizontal shake-constant"></div>
    return (
      <div className={menuClass}>
        <div className='business-add-wrap'>
          <a className="gt-btn-line gt--large gt--primary" onClick={this.increase}><i className="gt-icon icon-add"></i></a>
        </div>
        <div className="gt-menu-wrap">
          <ul className="gt-menu">
            {
              this.props.data.map((ele, index) => {
                return (<li key={index}>
                  <a href={ele.id} className="gt-menu__hd">
                    <div className="update-edit-wrap">
                      <button className="update-btn" type='button'>更新</button>
                    </div>
                    <img src={ele.url}/>
                    <div className="delete-edit-wrap">
                      <button className="delete-btn" type='button'>删除</button>
                    </div>
                    <span className="gt-menu__txt">{ele.name}</span>
                  </a>
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
  // console.log(state.globalReducer)
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
