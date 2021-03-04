import React from 'react'
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const ToastAlert = () => {

    return (
        <ToastContainer
            position="bottom-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            draggable
            limit={3}
        />
    )
}

export default ToastAlert
