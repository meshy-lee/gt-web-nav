import React, { Component } from 'react'
import Topbar from '@/components/topbar/index'
import PrimaryMenu from '@/components/menu/views/primary_menu'

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
