import { observer } from 'mobx-react'
import React, { useState, useEffect } from 'react'
import WalletStore from "../store";
import { ElementsStore } from "../store"
import { Modal, Button, Tabs, Tab, Form } from 'react-bootstrap';



export const MoneyOperator: React.FC = observer(() => {
    const { sumSalaries, activeWallet, walletList, exchanger, fillIn } = WalletStore
    const { modalWindow, modalHandle } = ElementsStore
    const [amount, setamount] = useState<number>(0)
    const [description, setdescription] = useState<string>('')
    const [sendVector, setsendVector] = useState<string>('')
    const [type, settype] = useState<string | null>(null)


    const amountHandler = (summ: number) => {
        let limit: number = sumSalaries(activeWallet)
        if (summ < 0) summ = 0
        if (type !== 'in' && summ > limit) summ = limit
        setamount(summ)
    }

    const vectorHandler = (uuid: string) => {
        setsendVector(uuid)
    }

    const submitHandle = () => {
        switch (type) {
            case 'exch':
                exchanger(activeWallet, sendVector, amount, 'Обменная операция')
                break;
            case 'out':
                exchanger(activeWallet, '0', amount, 'Вывод средств:' + description)
                break;
            case 'in':
                fillIn(activeWallet, amount)
                break;
            default:
                break;
        }
    }


    useEffect(() => {
        setsendVector('')
        setamount(0)
    }, [type, modalWindow])

    return (
        <Modal show={modalWindow} onHide={modalHandle}>
            <Modal.Body>
                <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example"
                    activeKey={type}
                    onSelect={(k) => settype(k)}
                >
                    <Tab eventKey="exch" title="Обмен">
                        <div className="content__operation__operator--notate">
                            На какой кошелёк?
                </div>
                        <Form.Control as="select" defaultValue={''} onChange={e => vectorHandler(e.target.value)}>
                            <option selected disabled>Выбрать</option>
                            {walletList.filter(x => x.uuid !== activeWallet).map(item => <option key={item.uuid} value={item.uuid}>{item.currency} ({sumSalaries(item.uuid)})</option>)}
                        </Form.Control>
                        <div className="content__operation__operator--notate">
                            Сколько
                </div>
                        <Form.Control type="number"
                            placeholder="Сумма"
                            required
                            value={amount}
                            onChange={e => amountHandler(+e.target.value)}
                        />

                    </Tab>

                    <Tab eventKey="out" title="Снятие">
                        <div className="content__operation__operator--notate">
                            Сколько
                    </div>
                        <Form.Control type="number"
                            placeholder="Сумма"
                            required
                            value={amount}
                            onChange={e => amountHandler(+e.target.value)}
                        />
                        <div className="content__operation__operator--notate">
                            Причина вывода
                    </div>
                        <Form.Control type="text"
                            placeholder="Причина"
                            required
                            value={description}
                            onChange={e => setdescription(e.target.value)}
                        />
                    </Tab>


                    <Tab eventKey="in" title="Пополнить">
                        <div className="content__operation__operator--notate">
                            Сколько
                    </div>
                        <Form.Control type="number"
                            placeholder="Сумма"
                            required
                            value={amount}
                            onChange={e => amountHandler(+e.target.value)}
                        />
                    </Tab>
                </Tabs>
            </Modal.Body>
            <Modal.Footer>
                <div className="content__operation__operator--button">
                    <Button variant="outline-success" onClick={submitHandle} disabled={amount === 0}>
                        Подтвердить
                                </Button>
                </div>
                <Button variant="secondary" onClick={modalHandle}>
                    Close
          </Button>
            </Modal.Footer>
        </Modal>
    )
})
