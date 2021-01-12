import { observer } from "mobx-react";
import React from "react";
import WalletStore  from "./store";
import './style.scss'
import { AddWallet } from "./wallets/AddWallet";
import { OperationList } from "./wallets/OperationList";
import { Wallet } from "./wallets/Wallet";
import 'bootstrap/dist/css/bootstrap.min.css';


const App: React.FC = observer(() => {
  const {walletList, activeWallet} = WalletStore

  return (
    <div className="wrapper">
        <div className="content">
              
            <div className="content__menu">
                <div className="content__menu--title">My wallet</div>
                <div className="content__menu__walletsList">
                  {walletList.map((item:any, index:number)=><Wallet {...item} key={index}/>)}
                  <AddWallet />
                </div>
            </div>
            {activeWallet  && <OperationList />}
        </div>
    </div>
  );
});

export default App;
