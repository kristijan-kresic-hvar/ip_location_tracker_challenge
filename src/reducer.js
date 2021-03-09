export const initialState = {
    isLoading: false,
    ip: '',
    location: '',
    timezone: '',
    isp: '',
    lng: '',
    lat: '',
    domain: ''
}

const reducer = (state, action) => {
    switch(action.type) {
        case 'SET_IP_DATA':
            return {
                ...state,
                ip: action.ip,
                location: action.location,
                timezone: action.timezone,
                isp: action.isp,
                lng: action.lng,
                lat: action.lat,
                domain: action.domain
            }
            break;
        case 'SET_LOADING':
            return {
                ...state,
                isLoading: action.isLoading
            }
        default:
            return state;
            break;
    }   
}

export default reducer