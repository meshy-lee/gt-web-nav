/* eslint-disable no-undef */
/* eslint-disable no-useless-escape */
import React, {Component} from 'react'
import cl from 'classnames'
import './index.less'
import {addWebsite, updateWebsite} from '@/api/website'
import {uploadImg} from '@/api/common'

class WebsiteModal extends Component {
  constructor () {
    super(...arguments)
    const form = {
      name: {
        value: '',
        validate: true
      },
      url: {
        value: '',
        validate: true
      },
      imgUrl: {
        value: '',
        validate: true
      },
      type: 0, // 线网、测试网、准现网
      belong: Number(this.props.data.belong), // 父级
      accountList: [{
        userName: '',
        psw: ''
      }]
    }
    if (this.props.action === 'update') {
      let propsData = {...this.props.data}
      form.name.value = propsData.name
      form.url.value = propsData.url
      form.type = propsData.type
      form.accountList = propsData.accountList
      form.imgUrl = {
        value: propsData.img,
        validate: true
      }
      form.id = propsData.id
      form.imgName = propsData.url
    }
    this.state = {
      form,
      imgName: ''
    }
    this.increaseUser = this.increaseUser.bind(this)
    this.autoSetState = this.autoSetState.bind(this)
    this.handleChangeName = this.handleChangeName.bind(this)
    this.handleChangeUrl = this.handleChangeUrl.bind(this)
    this.uploadImg = this.uploadImg.bind(this)
    this.validate = this.validate.bind(this)
  }
  validate () {
    let {name, url, imgUrl, type, belong, accountList} = this.state.form
    if (name.value && name.validate && url.value && url.validate && imgUrl.value && imgUrl.validate) {
      const params = {
        name: name.value,
        url: url.value,
        imgUrl: imgUrl.value,
        belong,
        type,
        accountList
      }
      if (this.props.action === 'update') {
        params.id = this.props.data.id
        this._Update({body: JSON.stringify(params)})
      } else {
        this._Add({body: JSON.stringify(params)})
      }
    } else {
      let copyState = this.state

      copyState.form.name.validate = !!name.value

      copyState.form.url.validate = !!url.value

      copyState.form.imgUrl.validate = !!imgUrl.value

      this.setState(copyState)
    }
  }
  _Update (params) {
    updateWebsite(params).then(res => {
      this.$toast({
        type: 'success',
        message: res.msg || '更新成功!'
      })
      this.props.comfirm()
    })
  }
  _Add (params) {
    addWebsite(params).then(res => {
      this.$toast({
        type: 'success',
        message: res.msg || '添加成功!'
      })
      this.props.comfirm()
    })
  }
  increaseUser () {
    if (this.state.form.accountList.length >= 5) {
      this.$toast({
        type: 'warning',
        message: '只能添加5项'
      })
      return
    }
    const {form, imgName} = this.state
    this.setState({
      form: {...form, accountList: [...form.accountList, {userName: '', psw: ''}]},
      imgName
    })
  }
  decreaseUse (index) {
    const {form, imgName} = this.state
    const copy = [...form.accountList]
    copy.splice(index, 1)
    this.setState({
      form: {...form, accountList: [...copy]},
      imgName
    })
  }
  uploadImg (e) {
    let that = this
    let reg = /[.](jpg|gif|png|JPG|PNG|GIF|jpeg)$/
    if (!e.target.files[0]) return
    if (e.target.files[0].name.match(reg) == null) {
      this.$toastr({type: 'toast-error', message: '文件格式不正确'})
      return
    }
    this.$fileName = e.target.files[0].name
    if (e.target.files[0].size > 51200) {
      this.$toastr({type: 'toast-error', message: '图片需小于50KB'})
      return
    }

    const target = e.target.files[0]
    const {form} = this.state
    this.setState({
      form: {
        ...form
      },
      imgName: e.target.files[0].name
    })
    let data = new FormData()
    data.append('file', target)
    that._UploadImg({body: data}).then(res => {
      console.log(res)
      if (!res.result) {
        this.$toast({
          type: 'success',
          message: '上传成功!'
        })
        this.autoSetState('imgUrl', res.url, true)
      }
      let reader = new FileReader()
      reader.readAsDataURL(target)
      reader.onload = function (ev) {
        let image = new Image()
        image.src = this.result
        image.onload = function () {
          let img = that.refs.imgWrap.querySelector('.gt-upload-img')
          if (img) img.remove()
          this.className = 'gt-upload-img'
          that.refs.imgWrap.append(this)
        }
      }
    }, errRes => {

    })
  }
  _UploadImg (params) {
    return uploadImg(params)
  }
  handleChangeName (ev) {
    const val = ev.target.value
    let pass = !!(val !== '')
    this.autoSetState('name', ev.target.value, pass)
  }
  handleChangeUrl (ev) {
    const val = ev.target.value
    const reg = /(www|http:|https:)+[^\s]+[\w]/
    let pass = !!(val !== '' && reg.test(val))
    this.autoSetState('url', ev.target.value, pass)
  }
  hanleChangeType (ev) {
    const {form, imgName} = this.state
    this.setState({
      form: {
        ...form,
        type: Number(ev.target.value)
      },
      imgName
    })
  }
  handleChangeAccoutName (index, ev) {
    const {accountList} = this.state.form
    const target = accountList.filter((ele, ind) => ind === index)[0]
    target.userName = ev.target.value
    const {form, imgName} = this.state
    this.setState({
      form: {
        ...form,
        accountList
      },
      imgName
    })
    // this.autoSetState('accountList', [...accountList])
  }
  handleChangePassword (index, ev) {
    const {accountList} = this.state.form
    const target = accountList.filter((ele, ind) => ind === index)[0]
    target.psw = ev.target.value
    const {form, imgName} = this.state
    this.setState({
      form: {
        ...form,
        accountList
      },
      imgName
    })
  }
  autoSetState (key, value, pass) {
    const {form, imgName} = this.state
    this.setState({
      form: {
        ...form,
        [key]: {
          value,
          validate: pass
        }
      },
      imgName
    })
  }
  componentDidMount () {
    let propsData = this.props.data
    if (this.props.action === 'update') {
      let image = new Image()
      image.src = propsData.img
      image.className = 'gt-upload-img'
      this.refs.imgWrap.append(image)
    }
  }
  render () {
    const {form, imgName} = this.state
    const typeOpts = [{
      value: 0,
      label: '线网'
    }, {
      value: 1,
      label: '准线网'
    }, {
      value: 2,
      label: '测试网'
    }]
    let uploadSuccessTip = null
    if (imgName) {
      uploadSuccessTip = <div className="gt-upload-result__cell gt--success">
        <span className="gt-upload-result__file">{imgName}</span>
        <span className="gt-upload-result__tip">上传成功</span>
        <div className="gt-upload__load-wrap">
          <div className="gt-upload__load"></div>
        </div>
      </div>
    }
    return (
      <div className="gt-modal__content">
        <div className="gt-modal__header">
          <div className="gt-modal__header__title">{this.props.action === 'update' ? '编辑' : '新增'}</div>
        </div>
        <div className="gt-modal__body">
          <div className="gt-form-bd-auto">
            <div className="gt-form-group">
              <label className="gt-form__label gt--required">网站名称</label>
              <div className="gt-form__content">
                <input
                  placeholder="请输入网站名称，不得超过12个字符。"
                  maxLength="12"
                  defaultValue={form.name.value}
                  className={cl({'gt-form-control': true, 'gt--error': !form.name.validate})}
                  type="text"
                  name="websiteName"
                  onBlur={this.handleChangeName}/>
              </div>
            </div>
            <div className="gt-form-group">
              <label className="gt-form__label gt--required">网站链接</label>
              <div className="gt-form__content">
                <input
                  placeholder="请输入网站链接，不得超过100个字符。"
                  maxLength="100"
                  defaultValue={form.url.value}
                  className={cl({'gt-form-control': true, 'gt--error': !form.url.validate})}
                  type="url"
                  name="websiteName"
                  onBlur={this.handleChangeUrl}/>
              </div>
            </div>
            <div className="gt-form-group">
              <label className="gt-form__label gt--required">网站类型</label>
              <div className="gt-form__content">
                {
                  typeOpts.map(ele => {
                    return <label className="gt-checkbox" key={ele.value}>
                      <input
                        value={ele.value}
                        type="radio"
                        name="websiteType"
                        checked={form.type === ele.value}
                        onChange={this.hanleChangeType.bind(this)}/>
                      <span className="gt-radio__style"></span>
                      <span className="gt-radio__txt">{ele.label}</span>
                    </label>
                  })
                }
              </div>
            </div>
            <div className="gt-form-group">
              <label className="gt-form__label gt--required">网站图标</label>
              <div className="gt-form__content">
                <div className={cl({'gt-upload': true, 'gt--error': !form.imgUrl.validate})}>
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
                  {uploadSuccessTip}
                </div>
              </div>
            </div>
            <div className="gt-form-group gt-form-horizontal-group">
              <label className="gt-form__label">常用账号密码</label>
              <div className="gt-form__content">
                {
                  form.accountList.map((ele, index) => {
                    return <div className="gt-form-input-btn gt-input--ws" key={index}>
                      <div className="fl">
                        <label className="gt-form__label">账号</label>
                        <input
                          defaultValue={ele.userName}
                          maxLength="20"
                          className="gt-form-control"
                          type="text"
                          name="websiteAccount"
                          onChange={this.handleChangeAccoutName.bind(this, index)}/>
                      </div>
                      <div className="fl">
                        <label className="gt-form__label">密码</label>
                        <input
                          defaultValue={ele.psw}
                          maxLength="36"
                          className="gt-form-control"
                          type="text"
                          name="websitePassword"
                          onChange={this.handleChangePassword.bind(this, index)}/>
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
          {
            this.props.action === 'update' ? <button
              className="gt-btn-line gt-btn-danger"
              onClick={() => {
                this.props.deleted(this.props.data, this.props.cancel)
              }}>删除</button> : ''
          }
          <button className="gt-btn-line" onClick={this.props.cancel}>取消</button>
          <button className="gt-btn-solid" onClick={this.validate}>确定</button>
        </div>
      </div>
    )
  }
}

export default WebsiteModal
