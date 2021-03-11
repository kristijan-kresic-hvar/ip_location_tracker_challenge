import React, { useState } from 'react'
import { useDataLayerValue } from '../../../DataLayer'
import { checkIfExists } from '../../../helpers'
import { getIPInfo } from '../../../api'
import isValidDomain from 'is-valid-domain'
import isIp from 'is-ip'
import { toast } from 'react-toastify'

import './search.css'

const Search = (props) => {

    const {
        handleFocus,
        setIsFocused
    } = props

     // extract stuff from the global state, add the dispatch action to change them afterwards
    const [{ ip, domain }, dispatch] = useDataLayerValue()

    const toastId = React.useRef(null)
    // Input field value
    const [searchValue, setSearchValue] = useState('')

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

    return (
        <div className="header__searchwrap">
            <input onKeyPress={handleKeyPress} onBlur={handleBlur} onFocus={handleFocus} onChange={handleChange} type="text" placeholder="Search for any IP Address or Domain" required />
            <button onClick={() => handleSubmit()}>
                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="14"><path fill="none" stroke="#FFF" strokeWidth="3" d="M2 1l6 6-6 6"/></svg>
            </button>
        </div>
    )
}

export default Search