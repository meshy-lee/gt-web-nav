import React from 'react'
import ReactDOM from 'react-dom'
import ModalWrapper from './../views/modal_wrapper'
// import Loading from './../../loading/index'
function Comfirm (opts = {}) {
  let defaultOpts = {
    message: '',
    zIndex: 1000
  }
  let mergeOpts = {
    ...defaultOpts,
    ...opts
  }

  const oDiv = document.createElement('div')
  oDiv.className = 'modal-root'
  const oBody = document.getElementsByTagName('body')[0]
  return new Promise((resolve, reject) => {
    const destroyed = () => {
      ReactDOM.unmountComponentAtNode(oDiv)
      document.body.removeChild(oDiv)
    }
    const rejectFn = (err) => {
      destroyed()
      reject(err)
    }
    const resolveFn = () => {
      destroyed()
      resolve()
    }
    const element = (
      <ModalWrapper opts={{showBackdrop: false}}>
        <div className="gt-modal gt--small">
          <div className="gt-modal__scroll">
            <div className="gt-modal__content">
              <div className="gt-modal__body">
                <p className="gt-modal__p">{mergeOpts.message}</p>
              </div>
              <div className="gt-modal__footer">
                <button className="gt-btn-line" onClick={rejectFn}>取消</button>
                <button className="gt-btn-solid" onClick={resolveFn}>确定</button>
              </div>
            </div>
          </div>
        </div>
      </ModalWrapper>
    )
    oBody.appendChild(oDiv)
    ReactDOM.render(element, oDiv)
  })
}
Object.defineProperty(React.Component.prototype, '$comfirm', {
  value: Comfirm
})
Object.defineProperty(React, '$comfirm', {
  value: Comfirm
})
