"use client";
import { io } from "socket.io-client";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import React from "react";

import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

import { useGetTaskById } from "@/entities/task/model";
import { useCoordinate } from "./hooks/useCoordinate";

let DefaultIcon = L.icon({
  iconUrl: icon.src,
  shadowUrl: iconShadow.src,
});
export let socket = io();

export default function Map() {
  return (
    <MapContainer zoom={20} style={{ height: "40vh" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MyTask />
      <MyOtherUsers />
      <MyUserMarker />
    </MapContainer>
  );
}

async function coordToJson(coords: string) {
  return await JSON.parse(coords);
}

function MyTask() {
  const [geoData, setGeoData] = React.useState({ lat: 0, lng: 0 });
  const map = useMap();
  const { data } = useGetTaskById("15a08ced-258d-4168-9578-e7388f6c502a");

  React.useEffect(() => {
    async function revised() {
      const coords = await coordToJson(data?.coords as string);
      setGeoData({ lat: parseInt(coords.lat), lng: parseInt(coords.lon) });
    }
    if (data) revised();
  }, [data]);

  React.useEffect(() => {
    if (geoData && map) {
      map.setView({ lat: geoData.lat, lng: geoData.lng }, 7);
    }
  }, [map, geoData]);

  return <Marker icon={DefaultIcon} position={[geoData?.lat, geoData?.lng]} />;
}
function MyUserMarker() {
  const { geoData, map } = useCoordinate();

  React.useEffect(() => {
    if (geoData && map) {
      map.setView({ lat: geoData.lat, lng: geoData.lng }, 7);
    }
  }, [map, geoData]);

  return <Marker icon={DefaultIcon} position={[geoData?.lat, geoData?.lng]} />;
}
function MyOtherUsers() {
  const [geoData, setGeoData] = React.useState({ lat: 0, lng: 0 });
  const map = useMap();

  React.useEffect(() => {
    console.log("-**-");
    socket.on("send", (data: any) => {
      console.log(data, "SEND-COORD");

      setGeoData(data);
    });

    return () => {
      socket.off("send");
    };
  }, []);

  React.useEffect(() => {
    if (geoData && map) {
      map.setView({ lat: geoData.lat, lng: geoData.lng }, 7);
    }
  }, [map, geoData]);

  return <Marker icon={DefaultIcon} position={[geoData?.lat, geoData?.lng]} />;
}
