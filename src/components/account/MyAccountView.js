import React, { Component, Fragment } from 'react'
import { inject, observer } from 'mobx-react'
import NumberFormat from 'react-number-format'
import { FormattedMessage } from 'react-intl'
import { format } from 'date-fns'
import UsageResourceView from '../UsageResourceView'

@inject('accountStore', 'explorerStore')
@observer
class MyAccountView extends Component {
  componentDidMount = async () => {
    const { explorerStore, accountStore } = this.props
    await explorerStore.search(accountStore.account.name)
  }

  render() {
    const { accountStore, explorerStore } = this.props
    const cpu = accountStore.accountInfo.total_resources
      ? Number(accountStore.accountInfo.total_resources.cpu_weight.replace('RSN', ''))
      : 0.0
    const net = accountStore.accountInfo.total_resources
      ? Number(accountStore.accountInfo.total_resources.net_weight.replace('RSN', ''))
      : 0.0

    const stakeRsn = cpu + net
    const unstakeRsn = accountStore.accountInfo.core_liquid_balance
      ? Number(accountStore.accountInfo.core_liquid_balance.replace('RSN', ''))
      : 0.0

    const refundCpu = accountStore.accountInfo.refund_request
      ? Number(accountStore.accountInfo.refund_request.cpu_amount.replace('RSN', ''))
      : 0.0
    const refundNet = accountStore.accountInfo.refund_request
      ? Number(accountStore.accountInfo.refund_request.net_amount.replace('RSN', ''))
      : 0.0

    const refundRsn = refundCpu + refundNet
    const totalRsn = (stakeRsn + unstakeRsn + refundRsn).toFixed(4)
    const usageRsnRate = (stakeRsn / totalRsn) * 100

    const cpuUsed =
      accountStore.accountInfo.cpu_limit.used > 0 ? accountStore.accountInfo.cpu_limit.used : 0
    const cpuAvailable =
      accountStore.accountInfo.cpu_limit.available > 0
        ? accountStore.accountInfo.cpu_limit.available
        : 0
    const cpuMax =
      accountStore.accountInfo.cpu_limit.max > 0 ? accountStore.accountInfo.cpu_limit.max : 0
    const usageCpuRate = cpuMax > 0 ? (cpuUsed / cpuMax) * 100 : 0

    const netUsed =
      accountStore.accountInfo.net_limit.used > 0 ? accountStore.accountInfo.net_limit.used : 0
    const netAvailable =
      accountStore.accountInfo.net_limit.available > 0
        ? accountStore.accountInfo.net_limit.available
        : 0
    const netMax =
      accountStore.accountInfo.net_limit.max > 0 ? accountStore.accountInfo.net_limit.max : 0
    const usageNetRate = netMax > 0 ? (netUsed / netMax) * 100 : 0

    const ramUsed = accountStore.accountInfo.ram_usage > 0 ? accountStore.accountInfo.ram_usage : 0
    const ramMax = accountStore.accountInfo.ram_quota > 0 ? accountStore.accountInfo.ram_quota : 0
    const ramAvailable = ramMax - ramUsed
    const usageRamRate = ramMax > 0 ? (ramUsed / ramMax) * 100 : 0

    const rsnBalance = {
      title: 'Balance',
      subTitle: 'Total',
      balance: accountStore.rsnBalance ? accountStore.rsnBalance : 0,
      unit: ' RSN',
      total: totalRsn,
      totalUnit: ' RSN',
      color: 'bg-c-pink',
      icon: 'ti-wallet'
    }

    const stakedRsnBalance = {
      title: 'Staked',
      subTitle: 'Total',
      balance: stakeRsn.toFixed(4),
      unit: ' RSN',
      total: totalRsn,
      totalUnit: ' RSN',
      color: 'bg-c-blue',
      icon: 'ti-reload'
    }

    const refundRsnBalance = {
      title: 'Refund',
      subTitle: 'Total',
      balance: refundRsn,
      unit: ' RSN',
      total: totalRsn,
      totalUnit: ' RSN',
      color: 'bg-c-green',
      icon: 'ti-money'
    }

    const ramOwned = {
      title: 'Ram owned',
      subTitle: 'Ram usage',
      balance: accountStore.accountInfo ? accountStore.accountInfo.ram_quota : 0,
      unit: ' bytes',
      total: accountStore.accountInfo ? accountStore.accountInfo.ram_usage : 0,
      totalUnit: ' bytes',
      color: 'bg-c-yellow',
      icon: 'ti-save'
    }

    const cpuStake = {
      title: 'Cpu Staked',
      subTitle: 'Cpu max',
      balance: accountStore.accountInfo ? accountStore.accountInfo.total_resources.cpu_weight : 0,
      unit: ' RSN',
      total: accountStore.accountInfo ? accountStore.accountInfo.cpu_limit.max : 0,
      totalUnit: ' µs',
      color: 'bg-c-green',
      icon: 'ti-pulse'
    }

    const netStake = {
      title: 'Net Staked',
      subTitle: 'Net max',
      balance: accountStore.accountInfo ? accountStore.accountInfo.total_resources.net_weight : 0,
      unit: ' RSN',
      total: accountStore.accountInfo ? accountStore.accountInfo.net_limit.max : 0,
      totalUnit: ' bytes',
      color: 'bg-c-blue',
      icon: 'ti-signal'
    }

    const cpuResource = {
      title: 'CPU Available',
      fixed: 4,
      available: cpuAvailable,
      unit: ' µs',
      used: cpuUsed,
      max: cpuMax,
      usageRate: usageCpuRate,
      color: 'green'
    }

    const rsnResource = {
      title: 'RSN Available',
      fixed: 4,
      available: unstakeRsn,
      unit: ' RSN',
      used: stakeRsn,
      max: Number(totalRsn),
      usageRate: usageRsnRate,
      color: 'pink'
    }

    const ramResource = {
      title: 'RAM Available',
      fixed: 4,
      available: ramAvailable / 1024,
      unit: ' KB',
      used: ramUsed / 1024,
      max: ramMax / 1024,
      usageRate: usageRamRate,
      color: 'blue'
    }

    const netResource = {
      title: 'NET Available',
      fixed: 4,
      available: netAvailable / 1024,
      unit: ' KB',
      used: netUsed / 1024,
      max: netMax / 1024,
      usageRate: usageNetRate,
      color: 'yellow'
    }

    const img_path = '/images/rsn-symbol.png'

    return (
      <div className="page-wrapper">
        <div className="page-body">
          <div className="row">
            <Fragment>
              {!explorerStore.isLoading &&
                explorerStore.account && (
                  <div className="col-lg-6 col-xl-4 col-md-12 m-b-30">
                    <div className="card user-card">
                      <div className="card-header">
                        <h5>
                          <FormattedMessage id="Profile" />
                        </h5>
                      </div>
                      <div className="card-block m-0 p-0">
                        <div className="usre-image">
                          <img
                            src={img_path}
                            className="img-radius"
                            alt="RSN Logo"
                            style={{ width: '100px', height: '100px' }}
                          />
                        </div>
                        <h6 className="f-w-600 m-t-25 m-b-10">
                          {explorerStore.account.account_name}
                        </h6>
                        <p className="text-muted">
                          <FormattedMessage id="Created" />{' '}
                          {format(
                            new Date(explorerStore.account.created),
                            'YYYY-MM-DD HH:mm:ss.SSS'
                          )}
                        </p>
                        <hr />
                        <p className="text-muted p-t-15 p-b-15">
                          Total :{' '}
                          <NumberFormat
                            value={explorerStore.account.total.toFixed(4)}
                            displayType={'text'}
                            thousandSeparator={true}
                            suffix={' RSN'}
                          />
                        </p>
                        <div className="bg-c-blue counter-block p-15" style={{ height: '58px' }}>
                          <div className="row">
                            <div className="col-4">
                              <p>Unstake</p>
                              <p>
                                <NumberFormat
                                  value={explorerStore.account.unstake.toFixed(4)}
                                  displayType={'text'}
                                  thousandSeparator={true}
                                  suffix={' RSN'}
                                />
                              </p>
                            </div>
                            <div className="col-4">
                              <p>Stake</p>
                              <p>
                                <NumberFormat
                                  value={explorerStore.account.stake.toFixed(4)}
                                  displayType={'text'}
                                  thousandSeparator={true}
                                  suffix={' RSN'}
                                />
                              </p>
                            </div>
                            <div className="col-4">
                              <p>Refund</p>
                              <p>
                                <NumberFormat
                                  value={explorerStore.account.refund.toFixed(4)}
                                  displayType={'text'}
                                  thousandSeparator={true}
                                  suffix={' RSN'}
                                />
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              <div className="col-lg-6 col-md-12 col-xl-4">
                <UsageResourceView resource={rsnResource} />
                <UsageResourceView resource={cpuResource} />
              </div>
              <div className="col-lg-6 col-md-12 col-xl-4">
                <UsageResourceView resource={ramResource} />
                <UsageResourceView resource={netResource} />
              </div>
            </Fragment>
          </div>
        </div>
      </div>
    )
  }
}

export default MyAccountView

{
  /* <Fragment>
  <div className="main-body">
    <div className="page-wrapper">
      <div className="page-body">
        <div className="row">
          <BalanceView balance={rsnBalance} />
          <BalanceView balance={stakedRsnBalance} />
          <BalanceView balance={refundRsnBalance} />
        </div>
        <div className="row">
          <BalanceView balance={ramOwned} />
          <BalanceView balance={cpuStake} />
          <BalanceView balance={netStake} />
        </div>
      </div>
    </div>
  </div>
</Fragment> */
}
