import React from 'react'
import ReactDOM from 'react-dom'
import ModalWrapper from './../views/modal_wrapper'
import Loading from './../../loading/index'
function GlobalLoading (opts = {}) {
  let defaultOpts = {
    timeout: 2000,
    zIndex: 1000
  }
  let mergeOpts = {
    ...defaultOpts,
    ...opts
  }
  const element = (
    <ModalWrapper>
      <Loading/>
    </ModalWrapper>
  )
  const oDiv = document.createElement('div')
  const oBody = document.getElementsByTagName('body')[0]
  oBody.appendChild(oDiv)
  ReactDOM.render(element, oDiv)
  const removeGlobalLoading = () => {
    ReactDOM.unmountComponentAtNode(oDiv)
    document.body.removeChild(oDiv)
  }
  return removeGlobalLoading
}
React.Component.prototype.$globalLoading = GlobalLoading

export default GlobalLoading
