import React, { useContext, useState } from 'react'

import { truncate } from '../../helpers'

import { getIPInfo } from '../../api'
import { useDataLayerValue } from '../../DataLayer'

import patternBG from '../../assets/images/pattern-bg.png'
// import arrowRightIcon from '../../assets/icons/icon-arrow.svg'

import './header.css'

const Header = () => {

    // extract stuff from the global state, add the dispatch action to change them afterwards
    const [{ isLoading, ip, location, timezone, isp, lng, lat }, dispatch] = useDataLayerValue()

    const [searchValue, setSearchValue] = useState('')
    const [isFocused, setIsFocused] = useState(false)
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)

    const handleSubmit = async () => {

        // if search value is empty please leave the rest of the function
        if(!searchValue || searchValue.length == 0) {
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

            console.log(data)

            // set new data to the global state
            dispatch({
                type: 'SET_IP_DATA',
                ip: data.data.ip,
                location: data.data.location.city,
                timezone: data.data.location.timezone,
                isp: data.data.isp,
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

    const handleFocus = () => {
        if(windowWidth >= '768') return
        setIsFocused(true)
    }

    const handleBlur = () => {
        setIsFocused(false)
    }

    return (
        <header className="header" style={{ background: `url('${patternBG}')`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
            <div className="header__container">
                <h1>IP Address Tracker</h1>
                <div className="header__searchwrap">
                    <input onBlur={handleBlur} onFocus={handleFocus} onChange={handleChange} type="text" placeholder="Search for any IP Address or Domain" required />
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