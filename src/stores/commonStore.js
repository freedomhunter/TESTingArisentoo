import { decorate, observable, action } from 'mobx'
import ApiAgent from '../ApiAgent'
import Swal from 'sweetalert2'

export class CommonStore {
  isLoading = true
  _initilizedArisenid = false       //_initilizedArisenid to _initilizedArisenid
  _initilizedRsn = false
  coinMarketCap = null

  setLoading = isLoading => {
    this.isLoading = isLoading
  }

  initArisenid = isInit => {        //initArisenid to initArisenid
    this._initilizedArisenid = isInit   //_initilizedArisenid to _initilizedArisenid
  }

  initRsn = isInit => {
    this._initilizedRsn = isInit
  }

  getCoinMarketCap = async () => {
    try {
      let result = await ApiAgent.getCoinMarketCap()

      if (result) {
        this.coinMarketCap = result.data
      }
    } catch (e) {
      console.log(e)
    }
  }

  getMarketCapPrice = async () => {
    try {
      let price = await ApiAgent.getMarketCapPrice()
      if(price) {
        this.getMarketCapPrice = price.data
      }
    } catch (e) {
      console.log(e)
    }
  }

  arisenidNeededAlert = () => {       //arisenidNeededAlert to arisenidNeededAlert
    Swal({
      type: 'error',
      title: 'Oops...',
      text: 'You need to login with Arisenid wallet!',       // Arisenid to Arisenid
      footer: '<a href="https://arisenid.io/">Do you need Arisenid?</a>'       //Arisenid to Arisenid
    })
  }
}

decorate(CommonStore, {
  isLoading: observable,
  _initilizedArisenid: observable,   // _initilizedArisenid to _initilizedArisenid
  _initilizedRsn: observable,
  coinMarketCap: observable,
  ramMarketCap: observable,
  setLoading: action,
  initArisenid: action,       // initArisenid to initArisenid
  initRsn: action,
  getCoinMarketCap: action,
  getMarketCapPrice: action,
  arisenidNeededAlert: action       // arisenidNeededAlert to arisenidNeededAlert
})

export default new CommonStore()
