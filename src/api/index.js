import axios from 'axios'

const getIPInfo = async (ipAddress = '', domain = '') => {
    try {
        const result = await axios.get(`https://geo.ipify.org/api/v1?apiKey=${process.env.REACT_APP_IPIFY_API_KEY}&ipAddress=${ipAddress}&domain=${domain}`)

        return result
    }
    catch(e) {
        console.log(e.message)
    }
}

export {
    getIPInfo
}