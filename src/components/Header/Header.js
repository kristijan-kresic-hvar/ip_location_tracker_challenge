import React, { useState } from 'react'

import { truncate, checkIfExists } from '../../helpers'

import { getIPInfo } from '../../api'
import { useDataLayerValue } from '../../DataLayer'

import patternBG from '../../assets/images/pattern-bg.png'

import './header.css'

const Header = () => {

    // extract stuff from the global state, add the dispatch action to change them afterwards
    const [{ isLoading, ip, location, timezone, isp, lng, lat }, dispatch] = useDataLayerValue()

    const [searchValue, setSearchValue] = useState('')
    const [isFocused, setIsFocused] = useState(false)
    const [windowWidth] = useState(window.innerWidth)

    const handleSubmit = async () => {

        // if search value is empty please leave the rest of the function
        if(!searchValue || searchValue.length == 0) {
            return
        }

        if(searchValue === ip) {
            return
        }

        // try executing
        try {

            // set loading state to true, start of fetching
            dispatch({
                type: 'SET_LOADING',
                isLoading: true
            })

            const data = await getIPInfo(searchValue)

            // set new data to the global state
            dispatch({
                type: 'SET_IP_DATA',
                ip: checkIfExists(data.data.ip, 'N/A'),
                location: checkIfExists(data.data.location.city, 'N/A'), 
                timezone: checkIfExists(data.data.location.timezone, 'N/A'),
                isp: checkIfExists(data.data.isp, 'N/A'),
                lng: data.data.location.lng,
                lat: data.data.location.lat
            })

            // set loading state to false, end of fetching
            dispatch({
                type: 'SET_LOADING',
                isLoading: false
            })
        }
        // if you fail catch an error
        catch(e) {
            console.log(e.message)
        }
    }

    const handleChange = (e) => {
        setSearchValue(e.target.value)
    }
    
    const handleFocus = (e) => {

        if(windowWidth >= '768') return
        setIsFocused(true)
    }

    const handleBlur = (e) => {
        setIsFocused(false)
    }

    const handleKeyPress = (e) => {
        if(e.key === 'Enter') {
            handleSubmit()
        }
    }

    console.log(searchValue)

    return (
        <header className="header" style={{ background: `url('${patternBG}')`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
            <div className="header__container">
                <h1>IP Address Tracker</h1>
                <div className="header__searchwrap">
                    <input onKeyPress={handleKeyPress} onBlur={handleBlur} onFocus={handleFocus} onChange={handleChange} type="text" placeholder="Search for any IP Address or Domain" required />
                    <button onClick={() => handleSubmit()}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="14"><path fill="none" stroke="#FFF" strokeWidth="3" d="M2 1l6 6-6 6"/></svg>
                    </button>
                </div>
            </div>
            {!isFocused ? <div className="header__results">
                <div className="header__results--ipaddress">
                    <h3>ip address</h3>
                    <p>{ isLoading ? 'N/A': ip }</p>
                </div>

                <div className="header__results--location">
                    <h3>location</h3>
                    <p>{ isLoading ? 'N/A' : location }</p>
                </div>

                <div className="header__results--timezone">
                    <h3>timezone</h3>
                    <p>{ isLoading ? 'N/A' : timezone }</p>
                </div>

                <div className="header__results--isp">
                    <h3>isp</h3>
                    <p>{ isLoading ? 'N/A' : truncate(isp, 30) }</p>
                </div>
            </div> : '' }
        </header>
    )
}

export default Header