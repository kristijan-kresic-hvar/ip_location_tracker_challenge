import React, { useState, useEffect } from 'react'

import './App.css';

import Header from './components/Header/Header'
import Map from './components/Map/Map'
import RotateAlert from './components/Alerts/RotateAlert/RotateAlert'
import ToastAlert from './components/Alerts/ToastAlert/ToastAlert'

function App() {

  const [isLandscape, setIsLandscape] = useState(false)

  const checkIfLandscape = () => {
    if(window.screen.availWidth > window.screen.availHeight && window.screen.availWidth <= 768) {
      setIsLandscape(true)
    } else {
      setIsLandscape(false)
    }
  }

  useEffect(() => {

    // Check for orientation immediataly
    checkIfLandscape()

    // check for landscape when user resizes their window ( browser )
    window.addEventListener('resize', () => {
      checkIfLandscape()
    })
  }, [])

  return (
    <div className="app">
      <Header />
      <Map />
      {/* Testing state of toast messages */}
      <ToastAlert message="There has been an error" />
      {/* if the screen is rotated in landscape mode */}
      {isLandscape && <RotateAlert />}
    </div>
  );
}

export default App;
