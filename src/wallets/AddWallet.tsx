import React, {useState} from 'react'
import WalletStore  from "../store";


export const AddWallet: React.FC  = () => {
    const [currency, setCurrency] = useState<string>('USD')
    const {newWallet, currencyList} = WalletStore


    const changehandler = (curr:string) =>{
        setCurrency(curr)
    }
    const addNewWallet = (cur:string) =>{
        newWallet(cur)
    }

    return (
        <div className="wallet-box wallet-box--dashed">
            <select onChange={(e)=>{changehandler(e.target.value)}} value={currency}>
              {currencyList.map(item => <option key={item.currency} value={item.currency}>{item.currency}</option>)}
            </select>
        <div className="wallet-box--add" onClick={()=>addNewWallet(currency)}> + </div>
        </div>
    )
}
