import axios from 'axios'
const API_BASE_URL = `https://geo.ipify.org/api/v1?apiKey=${process.env.REACT_APP_IPIFY_API_KEY}&ipAddress=`

const getIPInfo = async (ipAddress) => {
    try {
        const result = await axios.get(API_BASE_URL + ipAddress)

        return result
    }
    catch(e) {
        console.log(e.message)
    }
}

export {
    getIPInfo
}