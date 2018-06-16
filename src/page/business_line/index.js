import React, { Component } from 'react'
import Topbar from '@/components/topbar/index'

class BusinessLineIndex extends Component {
  render (children) {
    return (
      <div id='home-container'>
        <Topbar/>
        {this.props.children}
      </div>
    )
  }
}
export default BusinessLineIndex
