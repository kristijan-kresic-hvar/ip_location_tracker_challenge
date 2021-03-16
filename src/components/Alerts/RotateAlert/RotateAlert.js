import React from 'react'

import alertBG from '../../../assets/images/rotate_alert.webp'

import './rotatealert.css'

const RotateAlert = () => {
    return (
        <div className="alert__container">
            <img src={alertBG} alt="rotate alert cover" />
        </div>
    )
}

export default RotateAlert