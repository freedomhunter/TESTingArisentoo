import React, { Component } from 'react'
import '../styles/layout/Header.scss'
import LoginView from '../components/LoginView'
import { Link, withRouter } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import LocaleSelectView from '../components/LocaleSelectView'

class Header extends Component {
  render() {
    return (
      <nav className="navbar header-navbar pcoded-header">
        <div className="navbar-wrapper">
          <div className="navbar-logo">
            <a className="mobile-menu" id="mobile-collapse" href="#!">
              <i className="ti-menu" />
            </a>
            <header>
              <Link to="/">
                <h5>
                  <img className="logo-arisen" src="/assets/images/arisenLogo.png"/>
                  <FormattedMessage id="ArisenTools" />
                </h5>
              </Link>
            </header>
          </div>

          <div className="navbar-container container-fluid">
            <ul className="nav-left">
              <li>
                <div className="sidebar_toggle">
                  <a href=" ">
                    <i className="ti-menu" />
                  </a>
                </div>
              </li>
            </ul>
            <ul className="nav-right">
              <li className="user-profile header-notification">
                <LocaleSelectView />
              </li>
              <li className="user-profile header-notification">
                <LoginView />
              </li>

              <li>
                <a
                  href="https://github.com/arisenio/arisen-tools"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa fa-github fa-lg" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

export default withRouter(Header)
