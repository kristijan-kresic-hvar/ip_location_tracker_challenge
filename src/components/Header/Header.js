import React, { useState, useEffect } from 'react'

import isValidDomain from 'is-valid-domain'
import isIp from 'is-ip'

import { toast } from 'react-toastify'

import { truncate, checkIfExists } from '../../helpers'

import { getIPInfo, getClientIp } from '../../api'
import { useDataLayerValue } from '../../DataLayer'

import patternBG from '../../assets/images/pattern-bg.png'

import './header.css'

const Header = () => {

    // extract stuff from the global state, add the dispatch action to change them afterwards
    const [{ isLoading, ip, location, timezone, isp, domain }, dispatch] = useDataLayerValue()

    // Input field value
    const [searchValue, setSearchValue] = useState('')

    // accessibility states
    const [isFocused, setIsFocused] = useState(false)
    const [windowWidth] = useState(window.innerWidth)

    const toastId = React.useRef(null)

    // Handle data submit
    const handleSubmit = async () => {

        // ERROR CHECKING

        // if search value is empty please leave the rest of the function
        if(!searchValue || searchValue.length === 0) {
            if(!toast.isActive(toastId.current)) {
                toastId.current = toast.error("Please enter something first!")
              }

              return
        }

        // Prevent spamming the same request
        if(searchValue === ip || searchValue === domain) {
            if(!toast.isActive(toastId.current)) {
                toastId.current = toast.error('Dont spamm!')
            }

            return
        }

        // check for invalid domain or ip address
        if(!isValidDomain(searchValue) && !isIp(searchValue)) {
            if(!toast.isActive(toastId.current)) {
                toastId.current = toast.error('Please enter valid ip or domain address!')
            }

            return
        }

        // try executing
        try {

            // set loading state to true, start of fetching
            dispatch({
                type: 'SET_LOADING',
                isLoading: true
            })

            // Check to see which data to search by
            if(isValidDomain(searchValue)) {

                const data = await getIPInfo('', searchValue)

                // If there is no data, break the operation
                if(!data) {
                    // Set loading to false
                    dispatch({
                        type: 'SET_LOADING',
                        isLoading: false
                    })

                    toast.info('Nothing found!')

                    return
                }

                 // set new data to the global state
                 dispatch({
                    type: 'SET_IP_DATA',
                    ip: checkIfExists(data.data.ip, 'N/A'),
                    location: checkIfExists(data.data.location.city, 'N/A'), 
                    timezone: checkIfExists(data.data.location.timezone, 'N/A'),
                    isp: checkIfExists(data.data.isp, 'N/A'),
                    lng: data.data.location.lng,
                    lat: data.data.location.lat,
                    domain: searchValue
                })

            } else if(isIp(searchValue)) {
                const data = await getIPInfo(searchValue, '')

                console.log(data)

                // If there is no data, break the operation
                if(!data) {

                    // Set loading to false
                    dispatch({
                        type: 'SET_LOADING',
                        isLoading: false
                    })

                    toast.warn('Nothing found')

                    return
                }

                // set new data to the global state
                dispatch({
                    type: 'SET_IP_DATA',
                    ip: checkIfExists(data.data.ip, 'N/A'),
                    location: checkIfExists(data.data.location.city, 'N/A'), 
                    timezone: checkIfExists(data.data.location.timezone, 'N/A'),
                    isp: checkIfExists(data.data.isp, 'N/A'),
                    lng: data.data.location.lng,
                    lat: data.data.location.lat,
                    domain: ''
                })
            }
            
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

    // Handle input value change
    const handleChange = (e) => {
        setSearchValue(e.target.value)
    }
    
    // Handle input focus
    const handleFocus = (e) => {

        if(windowWidth >= '768') return
        setIsFocused(true)
    }

    // Handle input unfocus
    const handleBlur = (e) => {
        setIsFocused(false)
    }

    // Handle enter key press
    const handleKeyPress = (e) => {
        if(e.key === 'Enter') {
            handleSubmit()
        }
    }

    // Set the initial data to that of a current client device ip address on component ( page load )
    useEffect(() => {
       const clientIp = async () => {

            dispatch({
                type: 'SET_LOADING',
                isLoading: true
            })

            const clientIPAddress = await getClientIp()

            const data = await getIPInfo(clientIPAddress)

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

       clientIp()
    }, [])

    return (
        <>
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
        </>
    )
}

export default Header