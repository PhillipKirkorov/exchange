import { observer } from 'mobx-react'
import React from 'react'
import WalletStore  from "../store";
import { MoneyOperator } from './MoneyOperator';
import { Operation } from './Operation';
import { Button } from 'react-bootstrap';
import {ElementsStore} from "../store"






export const OperationList: React.FC  = observer((): JSX.Element => {
    const {sumSalaries, activeWallet, balances} = WalletStore
    const {modalHandle} = ElementsStore


    return (
        <div className="content__operation">
            <MoneyOperator/>
            <div className="content__operation__total">
                <div className="content__operation__total--title">Balance</div>
                <div className="content__operation__total__menu">
                            <Button variant="primary" onClick={modalHandle}>
                                Новая операция +
                            </Button>
                </div>
                <div className="content__operation__total--amount">{sumSalaries(activeWallet)}</div>
            </div>
            {balances.filter(bal=>bal.uuid === activeWallet).map((item, index)=><Operation {...item} key={index}/>)}
        </div>
    )
})
