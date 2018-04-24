import React, {Component} from 'react'
import './topbar.less'
class Topbar extends Component {
  render () {
    return (
      <header className="common-top-bar-box">
        <div className="wrapper">
          <div className="top-bar-wrap fix">
            <div className="top-bar-unit-box">
              <div className="unit-wrap">
                <div className="wrap-mask"></div>
                <a href="http://www.getui.com/cn/index.html" className="gt-logo link-wrap" target="_blank">
                </a>
              </div>
            </div>
            <div className="top-bar-unit-box">
              <div className="unit-wrap">
                <div className="wrap-mask"></div>
                <a href="../dev/#/overview" className="link-wrap">
                  <h1 className="gt-top-bar-title">个推导航小网站</h1>
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>
    )
  }
}

export default Topbar
