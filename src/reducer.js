export const initialState = {
    ip: '192.212.174.101',
    location: 'Brooklyn, NY 10001',
    timezone: 'UTC -05:00',
    isp: 'SpaceX Starlink',
    lng: '-118.07285',
    lat: '34.08057'
}

const reducer = (state, action) => {
    switch(action.type) {
        case 'SET_IP_DATA':
            return state;
            break;
        default:
            return state;
            break;
    }   
}

export default reducer