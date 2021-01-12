import { observer } from 'mobx-react'
import React from 'react'
import WalletStore  from "../store";


interface Props {
    uuid: string
    currency: string,
}


export const Wallet: React.FC <Props> = observer(({currency, uuid}) => {
    const {sumSalaries, setActiveWallet, activeWallet, balances} = WalletStore
    return (
        <div className={"wallet-box" + (activeWallet === uuid ? ' wallet-box--active' : '')} onClick={()=>{setActiveWallet(uuid)}}>
            <div className="wallet-box__curr">
                {currency}
            </div>
            <div className="wallet-box__amount">
                {sumSalaries(uuid)}
            </div>
        </div>
    )
})
