import React, { useContext } from 'react'

import { getIPInfo } from '../../api'
import { useDataLayerValue } from '../../DataLayer'

import patternBG from '../../assets/images/pattern-bg.png'
// import arrowRightIcon from '../../assets/icons/icon-arrow.svg'

import './header.css'

const Header = () => {

    const handleSubmit = async () => {
        getIPInfo('192.212.174.101')
    }

    const [{ ip, location, timezone, isp, lng, lat }, dispatch] = useDataLayerValue()

    return (
        <header className="header" style={{ background: `url('${patternBG}')`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
            <div className="header__container">
                <h1>IP Address Tracker</h1>
                <div className="header__searchwrap">
                    <input type="text" placeholder="Search for any IP Address or Domain" required />
                    <button onClick={handleSubmit}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="14"><path fill="none" stroke="#FFF" strokeWidth="3" d="M2 1l6 6-6 6"/></svg>
                    </button>
                </div>
            </div>
            <div className="header__results">
                <div className="header__results--ipaddress">
                    <h3>ip address</h3>
                    <p>{ ip }</p>
                </div>

                <div className="header__results--location">
                    <h3>location</h3>
                    <p>{ location }</p>
                </div>

                <div className="header__results--timezone">
                    <h3>timezone</h3>
                    <p>{ timezone }</p>
                </div>

                <div className="header__results--isp">
                    <h3>isp</h3>
                    <p>{ isp }</p>
                </div>
            </div>
        </header>
    )
}

export default Header