import React, { Component } from 'react'
class PreOnline extends Component {
  render () {
    const cells = [...this.props.preOnlineList]
    console.log(this.props)
    return (
      <div className='cell-box'>
        <div className='cell-header'>
          <h4>准线网</h4>
        </div>
        <div className='cell-body'>
          {
            cells.map(ele => {
              return (
                <a href={ele.url} className="cell pre-online-cell fl" key={ele.id} target="_blank">
                  <div className="cell-wrap">
                    <img className="logo" src={ele.img}/>
                    <p className="name">{ele.name}</p>
                    <div className="control">
                      <i className="gt-icon c-edit icon-home"></i>
                      <i className="gt-icon c-delete icon-cross-fat"></i>
                      <i className="gt-icon c-detail icon-application"></i>
                    </div>
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
export default PreOnline
