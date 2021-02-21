import React from 'react'

import patternBG from '../../assets/images/pattern-bg.png'
// import arrowRightIcon from '../../assets/icons/icon-arrow.svg'

import './header.css'

const Header = () => {

    const handleSubmit = () => {
        console.log("Hello there")
    }

    return (
        <header className="header" style={{ background: `url('${patternBG}')`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
            <div className="header__container">
                <h1>IP Address Tracker</h1>
                <div className="header__searchwrap">
                    <input type="text" placeholder="Search for any IP Address or Domain" required />
                    <button onClick={handleSubmit}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="14"><path fill="none" stroke="#FFF" stroke-width="3" d="M2 1l6 6-6 6"/></svg>
                    </button>
                </div>
            </div>
            <div class="header__results">
                <div class="header__results--ipaddress">
                    <h3>ip address</h3>
                    <p>192.212.174.101</p>
                </div>

                <div class="header__results--location">
                    <h3>location</h3>
                    <p>Brooklyn, NY 10001</p>
                </div>

                <div class="header__results--timezone">
                    <h3>timezone</h3>
                    <p>UTC -05:00</p>
                </div>

                <div class="header__results--isp">
                    <h3>isp</h3>
                    <p>SpaceX</p>
                    <p>Starlink</p>
                </div>
            </div>
        </header>
    )
}

export default Header