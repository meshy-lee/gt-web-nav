import React, { Component } from 'react'
import Topbar from '@/components/topbar/index'
import PrimaryMenu from '@/components/menu/views/primary_menu'

class BusinessLineIndex extends Component {
  render (children) {
    return (
      <div>
        <Topbar/>
        <PrimaryMenu/>
        <div id='home-container'>
          {this.props.children}
        </div>
      </div>
    )
  }
}
export default BusinessLineIndex
