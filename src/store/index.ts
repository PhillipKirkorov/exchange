import {makeObservable, observable, action } from "mobx";



export interface Balance {amount: number, description: string, uuid: string, date: Date };
export interface newWallet {currency: string, uuid: string };

class Wallets {
  constructor() {
    makeObservable(this)
  }
  
  @observable activeWallet : string  = ''

  @observable balances :  Balance[] = []

  @observable walletList : newWallet[] = []

  @observable
  currencyList = [ 
             {id: 1, currency: 'USD'}, 
             {id: 2, currency: 'EUR'}, 
             {id: 3, currency: 'RUB'}, 
             {id: 4, currency: 'OMG'}, 
             {id: 5, currency: 'ETH'}, 
             {id: 6, currency: 'XPR'} 
         ]
  
  @action newWallet = (curr: string) => {
    let newUuid:string = this.uuidv4()
    this.walletList.push({currency: curr, uuid: newUuid})
    this.balances.push({  uuid: newUuid, 
                          amount: Math.round(Math.random() * Math.random() * 211), 
                          date: new Date(), 
                          description: 'Инициализация кошелька'})
    localStorage.setItem('balances', JSON.stringify(this.balances))
    localStorage.setItem('wallets', JSON.stringify(this.walletList))
  }

  
 /*  @action observableArray(array:any){
    return JSON.parse(JSON.stringify(array))
  } */

  @action setActiveWallet = (uuid:string) =>{
      this.activeWallet = uuid
  }
  //add init oldWalets

  @action sumSalaries = (uuid:string) =>{
         let sum:number = 0
         let obj = this.balances.filter(bal => bal.uuid === uuid)
         for(var i=0; i < obj.length;i++){ 
             sum = sum + obj[i].amount; 
         }
         return sum 
  }

  @action exchanger = (from_uuid:string, to_uuid:string, amount: number, description: string) =>{
        let operations = [
          { uuid: from_uuid, 
            amount: -amount, 
            date: new Date(), 
            description: description},
          { uuid: to_uuid, 
            amount: Math.round(amount * Math.random()), 
            date: new Date(), 
            description: description},
        ]
        this.balances = this.balances.concat(operations)
        localStorage.setItem('balances', JSON.stringify(this.balances))
        ElementsStore.modalHandle()
  }

  @action fillIn = (to_uuid:string, amount: number) =>{
    let operations = [
      { uuid: to_uuid, 
        amount: amount, 
        date: new Date(), 
        description: 'Пополнение кошелька',
      }
    ]
    this.balances = this.balances.concat(operations)
    localStorage.setItem('balances', JSON.stringify(this.balances))
    ElementsStore.modalHandle()
  }

  @action uuidv4() {
    return '2xxxxxxx-0xxx-2xxx-yxxx-1xxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c === 'x' ? r : ((r & 0x3) | 0x8);
      return v.toString(16);
    });
  }

}

class Elements {
  constructor() {
    makeObservable(this)
  }
  
  @observable modalWindow : boolean  = false
  @action modalHandle=()=>{
    this.modalWindow = !this.modalWindow
  }

}

const WalletStore = new Wallets()
export const ElementsStore = new Elements()
export default WalletStore



