import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

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

    const [{lng, lat, dispatch}] = useDataLayerValue()

    let position = [lat, lng];

    return(
        <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
                <Popup>
                    IP approximate location
                </Popup>
            </Marker>
        </MapContainer>
    )
}

export default Map