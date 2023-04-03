'use client'

import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import React from "react";

import L from "leaflet"
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon.src,
  shadowUrl: iconShadow.src
});

export default function Map() {
  return (
    <MapContainer zoom={12} style={{ height: "40vh" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MyMap/>
    </MapContainer>
  );
}

function MyMap() {
  const [geoData, setGeoData] = React.useState({ lat: 0, lng: 0 });
  const map = useMap();
  function success(pos: any) {
    const crd = pos.coords;
    setGeoData({ lat: crd.latitude, lng: crd.longitude });
  }

  function error(err: any) {
    console.error(`ERROR(${err.code}): ${err.message}`);
  }
  React.useEffect(() => {
    const options = {
      enableHighAccuracy: true,
      timeout: 1000,
    };
    const id=navigator.geolocation.watchPosition(success, error, options);

    return ()=>navigator.geolocation.clearWatch(id);
  }, [navigator.geolocation]);

  React.useEffect(() => {
    if (geoData && map) {
      map.setView({lat:geoData.lat,lng:geoData.lng},12);
    }
  }, [map, geoData]);



  return <Marker icon={DefaultIcon} position={[geoData?.lat, geoData?.lng]} />;
}
