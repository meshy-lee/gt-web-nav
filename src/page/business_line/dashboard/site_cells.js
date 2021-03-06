import React, { Component } from 'react'
class SiteCells extends Component {
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
    const cells = [...this.props.siteCellList]
    return (
      <div className='cell-box'>
        <div className='cell-body' className={cells.length >= 5 ? 'cell-body' : 'cell-body cell-body-fixed'}>
          {
            cells.map(ele => {
              return (
                <a
                  title={ele.title}
                  href={ele.url}
                  className="cell"
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
export default SiteCells
