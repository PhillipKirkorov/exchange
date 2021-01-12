import { observer } from 'mobx-react'
import React from 'react'

interface Props {
    amount: number, 
    description: string, 
    date: Date
}



export const Operation: React.FC <Props> = observer(({amount, description, date}) => {

    return (
        <div className="content__operation__unit">
            <div className="content__operation__unit__description">
                {description}
            </div>
            <div className="content__operation__unit__amount" style={{color: amount > 0 ? 'green' : 'red'}}>
                <span>{amount > 0 && '+'}{amount}</span>
            </div>
        </div>
    )
})
