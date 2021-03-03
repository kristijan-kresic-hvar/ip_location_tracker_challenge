import React, { useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const ToastAlert = ({ message }) => {

    const notify = () => toast(message)

    useEffect(() => {
        notify()
    }, [message])

    return (
        <ToastContainer />
    )
}

export default ToastAlert
