/* eslint-disable no-undef */
import React, {Component} from 'react'
import './index.less'
import {addBusinessLine, updateBusinessLine} from '@/api/business_line'
import {uploadImg} from '@/api/common'
class BusinessMainModal extends Component {
  constructor () {
    super(...arguments)
    this.state = {
      form: {
        businessLineName: {
          value: '',
          validate: true
        },
        imgUrl: {
          value: '',
          validate: false
        }
      },
      imgName: ''
    }
    this.validateBusinessLineName = this.validateBusinessLineName.bind(this)
    this.validate = this.validate.bind(this)
    this.setItemValidate = this.setItemValidate.bind(this)
    this.uploadImg = this.uploadImg.bind(this)
    this._Add = this._Add.bind(this)
    this._Update = this._Update.bind(this)
  }
  // selectedIcon (el, index) {
  //   if (el.iconSelected) return false
  //   const {form, fontsList} = this.state
  //   fontsList.forEach((ele, ind) => {
  //     ele.userSelected = !!(index === ind)
  //   })
  //   fontsList[index].userSelected = true
  //   this.setState({
  //     form: {
  //       ...form,
  //       imgUrl: {
  //         value: el.iconClass,
  //         validate: true
  //       }
  //     },
  //     fontsList
  //   })
  // }
  validateBusinessLineName (ev) {
    const val = ev.target.value
    let pass = !!(val !== '' && val.length <= 6)
    this.setItemValidate(val, 'businessLineName', pass)
  }
  setItemValidate (value, attr, bol) {
    const {form} = this.state
    this.setState({
      form: {
        ...form,
        [attr]: {
          value,
          validate: bol
        }
      }
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

    // console.log(data)
    that._UploadImg({body: data}).then(res => {
      console.log(res)
      if (!res.result) {
        this.$toast({
          type: 'success',
          message: '上传成功!'
        })
        this.setItemValidate(res.url, 'imgUrl', true)
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
  validate () {
    let {businessLineName, imgUrl} = this.state.form
    if (businessLineName.validate && imgUrl.validate) {
      const url = JSON.stringify({
        businessLineName: businessLineName.value,
        imgUrl: imgUrl.value
      })
      this._Add({body: url})
    } else {
      this.$toast({
        type: 'error',
        message: '请填写完整信息!'
      })
    }
  }
  _UploadImg (params) {
    return uploadImg(params)
  }
  _Add (params) {
    console.log(params)
    addBusinessLine(params).then(res => {
      this.$toast({
        type: 'success',
        message: res.msg || '添加成功!'
      })
      this.props.comfirm()
    })
  }
  _Update () {
    updateBusinessLine().then(res => {
      console.log(res)
      res.json().then((responseJson) => {
        console.log(responseJson)
        this.$toast({
          type: 'success',
          message: responseJson.msg || '添加成功!'
        })
        // this.props.dispatch(actions.fetchBusinessLine())
        this.props.comfirm()
        // dispatch(fetchMenuSuccess(responseJson.data))
      }).catch((error) => {
        // dispatch(fetchMenuFailure())
      })
    })
  }
  render () {
    const {form, imgName} = this.state
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
          <div className="gt-modal__header__title">增加业务线</div>
        </div>
        <div className="gt-modal__body">
          <div className="gt-form-bd-auto">
            <div className="gt-form-group">
              <label className="gt-form__label gt--required">业务线名称</label>
              <div className="gt-form__content">
                <input className={form.businessLineName.validate ? 'gt-form-control' : 'gt-form-control gt--error'} onBlur={this.validateBusinessLineName} type="text" name="businessLineName"/>
              </div>
            </div>
            <div className="gt-form-group">
              <label className="gt-form__label gt--required">业务线名称</label>
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
                  {uploadSuccessTip}
                </div>
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
export default BusinessMainModal
