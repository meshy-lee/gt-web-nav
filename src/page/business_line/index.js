import React, { Component } from 'react'
import Topbar from '@/components/topbar/index'
import MenuPanel from '@/components/menu/views/menu_panel'

class BusinessLineIndex extends Component {
  render (children) {
    console.log(children)
    return (
      <div>
        <Topbar/>
        <MenuPanel/>
        <div id='home-container'>
          {this.props.children}
        </div>
      </div>
    )
  }
}
// const BusinessLineIndex = (children) => {
//   return (
//     <div>
//       <Topbar/>
//       <MenuPanel/>
//       <div id='home-container'>
//         {children}
//       </div>
//     </div>
//   )
// }
export default BusinessLineIndex
