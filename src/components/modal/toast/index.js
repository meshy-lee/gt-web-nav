import React from 'react'
import ReactDOM from 'react-dom'
import ModalWrapper from './../views/modal_wrapper'
// import Loading from './../../loading/index'
function Toast (opts = {}) {
  let defaultOpts = {
    timeout: 2000,
    zIndex: 1000
  }
  let mergeOpts = {
    ...defaultOpts,
    ...opts
  }
  let wrapType
  let iconType
  switch (mergeOpts.type) {
    case 'success':
      wrapType = 'gt-toast gt--success'
      iconType = 'gt-icon icon-right'
      break
    case 'error':
      wrapType = 'gt-toast gt--error'
      iconType = 'gt-icon icon-cross' // 云组件样式有问题 命名
      break
    case 'warning':
      wrapType = 'gt-toast gt--warning'
      iconType = 'gt-icon icon-warning'
      break
    case 'info':
      wrapType = 'gt-toast gt--info'
      iconType = 'gt-icon icon-info'
      break
    default:
      break
  }
  const oDiv = document.createElement('div')
  const oBody = document.getElementsByTagName('body')[0]
  let timer = null
  const remove = () => {
    clearTimeout(timer)
    ReactDOM.unmountComponentAtNode(oDiv)
    document.body.removeChild(oDiv)
  }
  const element = (
    <ModalWrapper>
      <div onClick={remove} className={wrapType}>
        <i className={iconType}></i>{mergeOpts.message}
      </div>
    </ModalWrapper>
  )
  oBody.appendChild(oDiv)
  ReactDOM.render(element, oDiv, () => {
    timer = setTimeout(() => {
      remove()
    }, mergeOpts.timeout)
  })
}
Object.defineProperty(React.Component.prototype, '$toast', {
  value: Toast
})
Object.defineProperty(React, '$toast', {
  value: Toast
})
// React.Component.prototype.$toast = Toast
