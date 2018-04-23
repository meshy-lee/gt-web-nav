import React, {Component} from 'react'
class ModalWrapper extends Component {
  constructor () {
    super()
    const oHtml = document.getElementsByTagName('html')[0]
    oHtml.classList.add('modal-in')
  }
  componentDidMount () {
    setTimeout(() => {
      if (this.refs.modal) this.refs.modal.classList.add('gt-in')
    }, 10)
  }
  componentWillUnmount () {
    const oHtml = document.getElementsByTagName('html')[0]
    oHtml.classList.remove('modal-in')
  }
  render (opts) {
    const mergeOpts = {...opts, ...this.props}
    return (
      <div ref='modal' className="gt-modal gt-fade">
        <div className="gt-modal__scroll">
          {mergeOpts.showBackdrop ? <div className="gt-backdrop"></div> : ''}
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default ModalWrapper
