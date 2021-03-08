import axios from 'axios'

// Get data based on provided terms
const getIPInfo = async (ipAddress = '', domain = '') => {
    try {
        const result = await axios.get(`https://geo.ipify.org/api/v1?apiKey=${process.env.REACT_APP_IPIFY_API_KEY}&ipAddress=${ipAddress}&domain=${domain}`)

        return result
    }
    catch(e) {
        console.log(e.message)
    }
}

// Get current client ip
const getClientIp = async () => {
    try { 
        const data = await axios.get('https://api64.ipify.org/')

        return data.data
    } catch (e) {
        console.log(e.message)
    }
}

export {
    getIPInfo,
    getClientIp
}