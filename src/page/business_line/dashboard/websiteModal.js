/* eslint-disable no-undef */
import React, {Component} from 'react'
import './index.less'
import {addWebsite, updateWebsite} from '@/api/website'
import {uploadImg} from '@/api/common'

class WebsiteModal extends Component {
  constructor () {
    super()
    this.state = {
      accountList: [{
        userName: '',
        psw: ''
      }]
    }
    this.increaseUser = this.increaseUser.bind(this)
  }
  increaseUser () {
    if (this.state.accountList.length >= 5) {
      this.$toast({
        type: 'warning',
        message: '只能添加5项'
      })
      return
    }
    this.setState({
      accountList: [...this.state.accountList, {userName: '', psw: ''}]
    })
  }
  decreaseUse (index) {
    const copy = [...this.state.accountList]
    copy.splice(index, 1)
    this.setState({
      accountList: [...copy]
    })
  }
  render () {
    /* const {form, imgName} = this.state
    let uploadSuccessTip = null
    if (imgName) {
      uploadSuccessTip = <div className="gt-upload-result__cell gt--success">
        <span className="gt-upload-result__file">{imgName}</span>
        <span className="gt-upload-result__tip">上传成功</span>
        <div className="gt-upload__load-wrap">
          <div className="gt-upload__load"></div>
        </div>
      </div>
    } */
    return (
      <div className="gt-modal__content">
        <div className="gt-modal__header">
          <div className="gt-modal__header__title">增加网站</div>
        </div>
        <div className="gt-modal__body">
          <div className="gt-form-bd-auto">
            <div className="gt-form-group">
              <label className="gt-form__label gt--required">网站名称</label>
              <div className="gt-form__content">
                <input className='gt-form-control' type="text" name="websiteName"/>
              </div>
            </div>
            <div className="gt-form-group">
              <label className="gt-form__label gt--required">网站类型</label>
              <div className="gt-form__content">
                <label className="gt-checkbox">
                  <input type="radio" name="websiteType"/>
                  <span className="gt-radio__style"></span>
                  <span className="gt-radio__txt">线网</span>
                </label>
                <label className="gt-radio">
                  <input type="radio" name="websiteType"/>
                  <span className="gt-radio__style"></span>
                  <span className="gt-radio__txt">准现网</span>
                </label>
                <label className="gt-radio">
                  <input type="radio" name="websiteType"/>
                  <span className="gt-radio__style"></span>
                  <span className="gt-radio__txt">测试网</span>
                </label>
              </div>
            </div>
            <div className="gt-form-group">
              <label className="gt-form__label gt--required">网站图标</label>
              <div className="gt-form__content">
                <div className="gt-upload">
                  <label className="gt-upload__style gt-upload-img__cell" ref="imgWrap">
                    <input type="file" className="gt-upload__file" onChange={this.uploadImg}/>
                  </label>
                  <div className="gt-upload__style gt-upload__style--img">
                    <div className="gt-upload__style--img-wrap">
                      <i className="gt-icon icon-add"></i>
                      <p className="gt-upload__img-text">上传图片</p>
                    </div>
                  </div>
                  <div className="gt-form__tip-block">请上传菜单ICON图片</div>
                </div>
              </div>
            </div>
            <div className="gt-form-group gt-form-horizontal-group">
              <label className="gt-form__label">常用账号密码</label>
              <div className="gt-form__content">
                {
                  this.state.accountList.map((ele, index) => {
                    return <div className="gt-form-input-btn gt-input--ws" key={index}>
                      <div className="fl">
                        <label className="gt-form__label">账号</label>
                        <input className="gt-form-control" type="text" name="websiteName"/>
                      </div>
                      <div className="fl">
                        <label className="gt-form__label">密码</label>
                        <input className="gt-form-control" type="text" name="websiteName"/>
                        <i className="gt-icon icon-add" onClick={this.increaseUser}></i>
                        {index !== 0 ? <i className="gt-icon icon-cross-fat" onClick={this.decreaseUse.bind(this, index)}></i> : ''}
                      </div>
                    </div>
                  })
                }
              </div>
            </div>
          </div>
        </div>
        <div className="gt-modal__footer">
          <button className="gt-btn-line" onClick={this.props.cancel}>取消</button>
          <button className="gt-btn-solid" onClick={this.validate}>确定</button>
        </div>
      </div>
    )
  }
}

export default WebsiteModal
