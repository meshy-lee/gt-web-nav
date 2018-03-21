import React, {Component} from 'react'
class Topbar extends Component {
  render () {
    return (
      <header className="gt-header">
        <a href="http://www.getui.com/cn/index.html" target="_blank" rel="nofollow me noopener noreferrer" className="gt-brand">
          <img src="https://dev.getui.com/top_bar_common_img/top_bar_small_logo.png" alt='logo' className="gt-logo"/>
        </a>
        <h1 className="gt-topbar-title">个推导航页面</h1>
      </header>
    )
  }
}

export default Topbar
