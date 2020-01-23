import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import '../styles/layout/Nav.scss'
import { FormattedMessage } from 'react-intl'
import { inject, observer } from '../../node_modules/mobx-react'

@inject('accountStore')
@observer
class Nav extends Component {
  constructor(props) {
    super(props)
    let { accountStore } = this.props
    this.accountStore = accountStore
  }

  routeActive = paths => {
    paths = Array.isArray(paths) ? paths : [paths]

    if (paths.indexOf(this.props.location.pathname.replace('/', '')) > -1) return true

    if (paths.indexOf('blockexplorers') > -1) {
      return this.props.location.pathname.replace('/', '').startsWith('blockexplorers')
    }

    return false
  }

  render() {
    return (
      <nav className="pcoded-navbar">
        <div className="pcoded-inner-navbar main-menu">
          <div className="pcoded-navigation-label">
          </div>

          <ul className="pcoded-item pcoded-left-item">
            <li
              className={
                'pcoded-hasmenu' +
                (this.routeActive(['blockexplorers']) ? ' active pcoded-trigger' : '')
              }
            >
              <a>
                <span className="pcoded-micon">
                  <i className="ti-search" />
                  <b>D</b>
                </span>
                <span className="pcoded-mtext">
                  <FormattedMessage id="Block Explorer" />
                </span>
                <span className="pcoded-mcaret" />
              </a>
              <ul className="pcoded-submenu">
                <li className={this.routeActive('blockexplorers') ? ' active' : ''}>
                  <Link to="/blockexplorers">
                    <span className="pcoded-micon">
                      <i className="ti-angle-right" />
                    </span>
                    <span className="pcoded-mtext">
                      <FormattedMessage id="Block Explorer" />
                    </span>
                    <span className="pcoded-mcaret" />
                  </Link>
                </li>
              </ul>
            </li>
          </ul>

          <ul className="pcoded-item pcoded-left-item">
            <li
              className={
                'pcoded-hasmenu' +
                (this.routeActive(['account/transfer']) ? ' active pcoded-trigger' : '')
              }
            >
              <a>
                <span className="pcoded-micon">
                  <i className="ti-export" />
                  <b>D</b>
                </span>
                <span className="pcoded-mtext">
                  <FormattedMessage id="Transfer Tokens" />
                </span>
                <span className="pcoded-mcaret" />
              </a>
              <ul className="pcoded-submenu">
                <li className={this.routeActive('account/transfer') ? ' active' : ''}>
                  <Link to="/account/transfer">
                    <span className="pcoded-micon">
                      <i className="ti-angle-right" />
                    </span>
                    <span className="pcoded-mtext">
                      <FormattedMessage id="Transfer Tokens" />
                    </span>
                    <span className="pcoded-mcaret" />
                  </Link>
                </li>
              </ul>
            </li>
          </ul>

          <ul className="pcoded-item pcoded-left-item">
            <li
              className={
                'pcoded-hasmenu' +
                (this.routeActive(['account/create', 'keys/create'])
                  ? ' active pcoded-trigger'
                  : '')
              }
            >
              <a>
                <span className="pcoded-micon">
                  <i className="ti-user" />
                  <b>D</b>
                </span>
                <span className="pcoded-mtext">
                  <FormattedMessage id="Create Account" />
                </span>
                <span className="pcoded-mcaret" />
              </a>
              <ul className="pcoded-submenu">
                <li className={this.routeActive('keys/create') ? ' active' : ''}>
                  <Link to="/keys/create">
                    <span className="pcoded-micon">
                      <i className="ti-angle-right" />
                    </span>
                    <span className="pcoded-mtext">
                      <FormattedMessage id="Create Key" />
                    </span>
                    <span className="pcoded-mcaret" />
                  </Link>
                </li>
                <li className={this.routeActive('account/create') ? ' active' : ''}>
                  <Link to="/account/create">
                    <span className="pcoded-micon">
                      <i className="ti-angle-right" />
                    </span>
                    <span className="pcoded-mtext">
                      <FormattedMessage id="Create Account" />
                    </span>
                    <span className="pcoded-mcaret" />
                  </Link>
                </li>
              </ul>
            </li>
          </ul>

          <ul className="pcoded-item pcoded-left-item">
            <li
              className={
                'pcoded-hasmenu' +
                (this.routeActive([
                  'account/my',
                  'account/staking',
                  'account/rammarket',
                  'account/refund'
                ])
                  ? ' active pcoded-trigger'
                  : '')
              }
            >
              <a>
                <span className="pcoded-micon">
                  <i className="ti-wallet" />
                  <b>D</b>
                </span>
                <span className="pcoded-mtext">
                  <FormattedMessage id="Account" />
                </span>
              </a>
              <span className="pcoded-mcaret" />
              <ul className="pcoded-submenu">
                <li className={this.routeActive('account/my') ? ' active' : ''}>
                  <Link to="/account/my">
                    <span className="pcoded-micon">
                      <i className="ti-angle-right" />
                    </span>
                    <span className="pcoded-mtext">
                      <FormattedMessage id="My Account" />
                    </span>
                    <span className="pcoded-mcaret" />
                  </Link>
                </li>
                <li className={this.routeActive('account/staking') ? ' active' : ''}>
                  <Link to="/account/staking">
                    <span className="pcoded-micon">
                      <i className="ti-angle-right" />
                    </span>
                    <span className="pcoded-mtext">
                      <FormattedMessage id="Staking" />
                    </span>
                    <span className="pcoded-mcaret" />
                  </Link>
                </li>
                <li className={this.routeActive('account/rammarket') ? ' active' : ''}>
                  <Link to="/account/rammarket">
                    <span className="pcoded-micon">
                      <i className="ti-angle-right" />
                    </span>
                    <span className="pcoded-mtext">
                      <FormattedMessage id="Ram Market" />
                    </span>
                    <span className="pcoded-badge label label-info ">RSN</span>
                    <span className="pcoded-mcaret" />
                  </Link>
                </li>
                <li className={this.routeActive('account/refund') ? ' active' : ''}>
                  <Link to="/account/refund">
                    <span className="pcoded-micon">
                      <i className="ti-angle-right" />
                    </span>
                    <span className="pcoded-mtext">
                      <FormattedMessage id="Refund" />
                    </span>
                    <span className="pcoded-mcaret" />
                  </Link>
                </li>
              </ul>
            </li>
          </ul>

          <ul className="pcoded-item pcoded-left-item">
            <li
              className={
                'pcoded-hasmenu' +
                (this.routeActive(['voting/vote', 'voting/proxy']) ? ' active pcoded-trigger' : '')
              }
            >
              <a>
                <span className="pcoded-micon">
                  <i className="ti-cup" />
                  <b>D</b>
                </span>
                <span className="pcoded-mtext">
                  <FormattedMessage id="Vote" />
                </span>
                <span className="pcoded-mcaret" />
              </a>
              <ul className="pcoded-submenu">
                <li className={this.routeActive('voting/vote') ? ' active' : ''}>
                  <Link to="/voting/vote">
                    <span className="pcoded-micon">
                      <i className="ti-angle-right" />
                    </span>
                    <span className="pcoded-mtext">
                      <FormattedMessage id="Vote" />
                    </span>
                    <span className="pcoded-mcaret" />
                  </Link>
                </li>

                <li className={this.routeActive('voting/proxy') ? ' active' : ''}>
                  <Link to="/voting/proxy">
                    <span className="pcoded-micon">
                      <i className="ti-angle-right" />
                    </span>
                    <span className="pcoded-mtext">
                      <FormattedMessage id="Register Proxy" />
                    </span>
                    <span className="pcoded-mcaret" />
                  </Link>
                </li>
              </ul>
            </li>
          </ul>

          <ul className="pcoded-item pcoded-left-item">
            <li
              className={
                'pcoded-hasmenu' +
                (this.routeActive(['bidding/names']) ? ' active pcoded-trigger' : '')
              }
            >
              <a>
                <span className="pcoded-micon">
                  <i className="ti-hand-drag" />
                  <b>D</b>
                </span>
                <span className="pcoded-mtext">
                  <FormattedMessage id="Bid Premium Name" />
                </span>
                <span className="pcoded-mcaret" />
              </a>
              <ul className="pcoded-submenu">
                <li className={this.routeActive('bidding/names') ? ' active' : ''}>
                  <Link to="/bidding/names">
                    <span className="pcoded-micon">
                      <i className="ti-angle-right" />
                    </span>
                    <span className="pcoded-mtext">
                      <FormattedMessage id="Bid Premium Name" />
                    </span>
                    <span className="pcoded-mcaret" />
                  </Link>
                </li>
              </ul>
            </li>
          </ul>

          <ul className="pcoded-item pcoded-left-item">
            <li
              className={
                'pcoded-hasmenu' +
                (this.routeActive(['constitution/provision']) ? ' active pcoded-trigger' : '')
              }
            >
              <a>
                <span className="pcoded-micon">
                  <i className="ti-book" />
                  <b>D</b>
                </span>
                <span className="pcoded-mtext">
                  <FormattedMessage id="Constitution" />
                </span>
                <span className="pcoded-mcaret" />
              </a>
              <ul className="pcoded-submenu">
                <li className={this.routeActive('constitution/provision') ? ' active' : ''}>
                  <Link to="/constitution/provision">
                    <span className="pcoded-micon">
                      <i className="ti-angle-right" />
                    </span>
                    <span className="pcoded-mtext">
                      <FormattedMessage id="Constitutional Provision" />
                    </span>
                    <span className="pcoded-mcaret" />
                  </Link>
                </li>
              </ul>
            </li>
          </ul>

          <ul className="pcoded-item pcoded-left-item">
            <li
              className={
                'pcoded-hasmenu' +
                (this.routeActive(['donation/donation']) ? ' active pcoded-trigger' : '')
              }
            >
              <a>
                <span className="pcoded-micon">
                  <i className="ti-gift" />
                  <b>D</b>
                </span>
                <span className="pcoded-mtext">
                  <FormattedMessage id="Donation" />
                </span>
                <span className="pcoded-mcaret" />
              </a>
              <ul className="pcoded-submenu">
                <li className={this.routeActive('donation/donation') ? ' active' : ''}>
                  <Link to="/donation/donation">
                    <span className="pcoded-micon">
                      <i className="ti-angle-right" />
                    </span>
                    <span className="pcoded-mtext">
                      <FormattedMessage id="Donation" />
                    </span>
                    <span className="pcoded-mcaret" />
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default withRouter(Nav)
