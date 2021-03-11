import React from 'react'

import { truncate } from '../../../../helpers/index'

const Result = (props) => {

    const { title, isLoading, result } = props

    return (
        <div className="header__results--item">
            <h3>{title}</h3>
            <p>{ isLoading ? 'N/A': truncate(result, 30) }</p>
        </div>
    )
}

export default Result