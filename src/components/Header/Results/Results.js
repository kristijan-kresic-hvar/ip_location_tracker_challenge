import React from 'react'

import { useDataLayerValue } from '../../../DataLayer'

import './results.css'

import Result from './Result/Result'


const Results = () => {

    // Extract only the used components from the global state
    const [{ isLoading, ip, location, timezone, isp }] = useDataLayerValue()

    return (
        <div className="header__results">
           <Result 
                title="ip address"
                isLoading={isLoading}
                result={ip} 
            />

            <Result 
                title="location"
                isLoading={isLoading}
                result={location}
            />

            <Result 
                title="timezone"
                isLoading={isLoading}
                result={timezone}
            />

            <Result 
                title="isp"
                isLoading={isLoading}
                result={isp}
            />
        </div>
    )
}

export default Results