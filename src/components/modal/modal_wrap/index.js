import React from 'react'
import ReactDOM from 'react-dom'
import ModalWrapper from './../views/modal_wrapper'
import Loading from './../../loading/index'
function ModalWrap (opts = {}, WrapperComponent) {
  let defaultOpts = {
    timeout: 2000,
    zIndex: 1000,
    showBackdrop: false
  }
  let mergeOpts = {
    ...defaultOpts,
    ...opts
  }
  const oDiv = document.createElement('div')
  oDiv.className = 'modal-root'
  const oBody = document.getElementsByTagName('body')[0]

  return new Promise((resolve, reject) => {
    const destroy = () => {
      oDiv.firstElementChild.classList.remove('gt-in')
      setTimeout(() => {
        ReactDOM.unmountComponentAtNode(oDiv)
        document.body.removeChild(oDiv)
      }, 350)
    }

    const comfirm = res => {
      resolve(res)
      destroy()
    }
    const cancel = res => {
      reject(res)
      destroy()
    }
    const element = (
      <ModalWrapper {...mergeOpts}>
        <WrapperComponent comfirm={comfirm} cancel={cancel} {...mergeOpts}/>
      </ModalWrapper>
    )
    oBody.appendChild(oDiv)
    ReactDOM.render(element, oDiv)
  })
}
Object.defineProperty(React.Component.prototype, '$modalWrap', {value: ModalWrap})
export default ModalWrap
