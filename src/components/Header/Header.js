import React, { useState, useEffect } from 'react'
import { checkIfExists } from '../../helpers'
import { getIPInfo, getClientIp } from '../../api'
import { useDataLayerValue } from '../../DataLayer'
import patternBG from '../../assets/images/pattern-bg.png'

import './header.css'

import Search from './Search/Search'
import Results from './Results/Results'

const Header = () => {

     // extract stuff from the global state, add the dispatch action to change them afterwards
     const [{}, dispatch] = useDataLayerValue()

    const [isFocused, setIsFocused] = useState(false)
     // accessibility states
     const [windowWidth] = useState(window.innerWidth)

    // Handle input focus
    const handleFocus = (e) => {

        if(windowWidth >= '768') return
        setIsFocused(true)
    }

    // function to fetch current device ip on component load
    const clientIp = async () => {

        if(localStorage.getItem('clientData')) {

            const cachedData = JSON.parse(localStorage.getItem('clientData'))

            dispatch({
                type: 'SET_IP_DATA',
                ip: checkIfExists(cachedData.data.ip, 'N/A'),
                location: checkIfExists(cachedData.data.location.city, 'N/A'), 
                timezone: checkIfExists(cachedData.data.location.timezone, 'N/A'),
                isp: checkIfExists(cachedData.data.isp, 'N/A'),
                lng: cachedData.data.location.lng,
                lat: cachedData.data.location.lat,
                domain: null
            })

            return
        }

        dispatch({
            type: 'SET_LOADING',
            isLoading: true
        })

        const clientIPAddress = await getClientIp()

        const data = await getIPInfo(clientIPAddress)

        // cache user data to prevent fetching api on each load
        localStorage.setItem('clientData', JSON.stringify(data));


        try {

            dispatch({
                type: 'SET_IP_DATA',
                ip: checkIfExists(data.data.ip, 'N/A'),
                location: checkIfExists(data.data.location.city, 'N/A'), 
                timezone: checkIfExists(data.data.location.timezone, 'N/A'),
                isp: checkIfExists(data.data.isp, 'N/A'),
                lng: data.data.location.lng,
                lat: data.data.location.lat,
                domain: null
            })

            dispatch({
                type: 'SET_LOADING',
                isLoading: false
            })

        } catch (e) {
            console.log(e.message)
        }
   }

    // Set the initial data to that of a current client device ip address on component ( page load )
    useEffect(() => {
       clientIp()
    }, [])

    return (
        <>
        <header className="header" style={{ background: `url('${patternBG}')`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
            <div className="header__container">
                <h1>IP Address Tracker</h1>
                <Search 
                    handleFocus={handleFocus} 
                    setIsFocused={setIsFocused} 
                />
            </div>
            {!isFocused ? <Results /> : '' }
        </header>
        </>
    )
}

export default Header