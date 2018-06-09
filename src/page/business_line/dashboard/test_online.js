import React, { Component } from 'react'
class TestOnline extends Component {
  render () {
    const cells = [...this.props.testOnlineList]
    return (
      <div className='cell-box'>
        <div className='cell-header'>
          <h4>测试网</h4>
        </div>
        <div className='cell-body'>
          {
            cells.map(ele => {
              return (
                <a href={ele.url} className="cell test-online-cell fl" key={ele.id} target="_blank">
                  <div className="cell-wrap">
                    <div className="control"></div>
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
