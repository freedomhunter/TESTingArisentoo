import React, { Component } from 'react'
import Routes from '../Routes'
import { inject, observer } from 'mobx-react'

@inject('commonStore')
@observer
class Main extends Component {
  constructor(props) {
    super(props)
    let { commonStore } = this.props
    this.commonStore = commonStore
  }

  render() {
    if (!this.commonStore._initilizedArisenId && !this.commonStore._initilizedRsn) {
      return <main />
    }
    return (
      <main>
        <Routes />
      </main>
    )
  }
}

export default Main
