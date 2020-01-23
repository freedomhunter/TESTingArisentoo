import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import NumberFormat from 'react-number-format'
import { FormattedMessage } from 'react-intl'

@inject('arisenStore')
@observer
class NameBidListView extends Component {
  constructor(props) {
    super(props)
    const { arisenStore } = this.props
    this.arisenStore = arisenStore
  }

  componentDidMount = async () => {
    await this.arisenStore.getGlobalInfo()
    this.arisenStore.getNameBids()
  }

  render() {
    let namebidList = []

    if (this.arisenStore.nameBids) {
      namebidList = this.arisenStore.nameBids.slice(0, 30)
    }
    return (
      <div className="col-md-6">
        <div className="card ">
          <div className="card-header ">
            <div className="card-header-left ">
              <h5>
                <FormattedMessage id="Account Name Bids Top 30" />
              </h5>
            </div>
            <div className="card-header-right" style={{ display: 'none' }}>
              <ul className="list-unstyled card-option">
                <li>
                  <i className="icofont icofont-simple-left " />
                </li>
                <li>
                  <i className="icofont icofont-maximize full-card" />
                </li>
                <li>
                  <i className="icofont icofont-minus minimize-card" />
                </li>
                <li>
                  <i className="icofont icofont-refresh reload-card" />
                </li>
                <li>
                  <i className="icofont icofont-error close-card" />
                </li>
              </ul>
            </div>
          </div>
          <div className="card-block ">
            {namebidList.length === 0 && (
              <div className="preloader3 loader-block">
                <div className="circ1" />
                <div className="circ2" />
                <div className="circ3" />
                <div className="circ4" />
              </div>
            )}
            {namebidList.map((n, index) => (
              <div
                key={index}
                className={
                  index === 0 ? 'browser-card p-b-15 ' : 'browser-card b-t-default p-t-15 p-b-15 '
                }
              >
                <p className="d-inline-block m-0 ">
                  {index + 1}. {n.newname}
                </p>
                <label
                  className={
                    'label btn-round float-right btn-browser' +
                    (index / 10 < 1
                      ? ' bg-c-blue'
                      : index / 10 < 2
                        ? ' bg-c-green'
                        : index / 10 < 3
                          ? ' bg-c-yellow'
                          : ' bg-c-pink')
                  }
                >
                  <NumberFormat
                    value={(n.high_bid / 10000).toFixed(4)}
                    displayType={'text'}
                    thousandSeparator={true}
                    suffix={' RSN'}
                  />
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default NameBidListView
