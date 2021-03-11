import React, { useState, useEffect } from 'react'

import './App.css';

import { checkIfMobile } from './helpers/index'

import Header from './components/Header/Header'
import Map from './components/Map/Map'
import RotateAlert from './components/Alerts/RotateAlert/RotateAlert'
import ToastAlert from './components/Alerts/ToastAlert/ToastAlert'

function App() {

  const [isLandscape, setIsLandscape] = useState(false)

  // check if user device is a phone and its orientatio is in a landscape mode
  const checkIfLandscape = () => {
    if(window.screen.availWidth > window.screen.availHeight && checkIfMobile(navigator.userAgent || navigator.vendor || window.opera)) {
      setIsLandscape(true)
    } else {
      setIsLandscape(false)
    }
  }

  useEffect(() => {

    // check if landscape on first load
    checkIfLandscape()

   // check for landscape when user resizes their window ( browser )
   window.addEventListener('resize', () => {
    checkIfLandscape()
  })
  
  }, [isLandscape])

  return (
      <div className="app">
          {/* if the screen is rotated in landscape mode */}
          { isLandscape && <RotateAlert />}
          <Header />
          <Map />
          {/* error handler component */}
          <ToastAlert />
      </div>
  )
}

export default App;
