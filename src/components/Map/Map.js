import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import Lottie from 'react-lottie'

import animationData from '../../lotties/paper-airplane-flying.json'

import L from 'leaflet'
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'

import 'leaflet/dist/leaflet.css'
import './map.css'

import { useDataLayerValue } from '../../DataLayer'

let DefaultIcon = L.icon({
    iconUrl: icon,
    iconShadow: iconShadow
})

L.Marker.prototype.options.icon = DefaultIcon

const Map = () => {

    const [{lng, lat, isLoading}] = useDataLayerValue()
    let position = [lat, lng];

    const lottieOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
          }
    }

    return (
        <>
            {isLoading ? <Lottie 
                options={lottieOptions}
                height={'65vh'}
                width={'100%'}
                isClickToPauseDisabled={true}
            /> : <div className="map__container"><MapContainer center={position} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                    <Popup>
                        IP approximate location
                    </Popup>
                </Marker>
            </MapContainer></div>}
        </>
    )
        
}

export default Map