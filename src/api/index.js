import axios from 'axios'
const API_BASE_URL = `https://geo.ipify.org/api/v1?apiKey=${process.env.REACT_APP_IPIFY_API_KEY}&ipAddress=`

const getIPInfo = async (ipAddress) => {
    const result = await axios.get(API_BASE_URL + ipAddress)

    console.log(result)
}

export {
    getIPInfo
}