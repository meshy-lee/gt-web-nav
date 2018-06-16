import React, { Component } from 'react'
class TestOnline extends Component {
  constructor () {
    super()
    this.handleContext = this.handleContext.bind(this)
  }
  handleContext (ev, ele) {
    ev.preventDefault()
    this.props.updateWebsite(ele)
    return false
  }
  render () {
    const cells = [...this.props.testOnlineList]
    return (
      <div className='cell-box'>
        <div className='cell-body'>
          {
            cells.map(ele => {
              return (
                <a
                  href={ele.url}
                  className="cell test-online-cell"
                  key={ele.id}
                  onContextMenu={(ev) => {
                    this.handleContext(ev, ele)
                  }}
                  target="_blank">
                  <div className="cell-wrap">
                    <img className="logo" src={ele.img}/>
                    <p className="name">{ele.name}</p>
                  </div>
                </a>
              )
            })
          }
        </div>
      </div>
    )
  }
}
export default TestOnline
