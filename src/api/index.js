import axios from 'axios'
const API_BASE_URL = "https://geo.ipify.org/api/v1?apiKey=at_SxAY28jWdFs58dFaUfTfzOi2AOUpi&ipAddress="

const getIPInfo = async (ipAddress) => {
    const result = await axios.get(API_BASE_URL + ipAddress)

    console.log(result)
}

export {
    getIPInfo
}