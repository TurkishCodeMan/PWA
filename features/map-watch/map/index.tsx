"use client";
import { io } from "socket.io-client";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
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

var LeafIcon = L.Icon.extend({
  options: {
    shadowUrl: "leaf-shadow.png",
    iconSize: [38, 95],
    shadowSize: [50, 64],
    iconAnchor: [22, 94],
    shadowAnchor: [4, 62],
    popupAnchor: [-3, -76],
  },
});
//@ts-expect-error
var redIcon = new LeafIcon({ iconUrl: "leaf-red.png" });

export let socket = io();

export default function Map() {
  const [coords, setCoords] = React.useState([]);

  React.useEffect(() => {
    socket.on("send", (data: any) => {
      console.log(data, "SEND-COORD");
      setCoords(data);
    });

    return () => {
      socket.off("send");
    };
  }, [socket, coords]);
  return (
    <MapContainer zoom={20} style={{ height: "40vh" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MyTask />
      {coords.map((val) => (
        <MyOtherUsers geoData={val} />
      ))}

    </MapContainer>
  );
}

async function coordToJson(coords: string) {
  return await JSON.parse(coords);
}

function MyTask() {
  const [geoData, setGeoData] = React.useState({ lat: 0, lng: 0 });
  const map = useMap();
  const { data } = useGetTaskById("ae3faeb4-4cb2-497c-bde6-8c5a5c44b9e2");
console.log(data,'DATA')
  React.useEffect(() => {
    async function revised() {
      const coords = await coordToJson(data?.coords as string);
      console.log(coords)
      setGeoData({ lat: (coords.lat), lng: (coords.lon) });
    }
    if (data ) revised();
  }, [data]);

  React.useEffect(() => {
    if (geoData && map) {
      map.setView({ lat: geoData.lat, lng: geoData.lng }, 5);
    }
  }, [map, geoData]);
console.log(geoData,'GWODATA')
  return <Marker icon={redIcon} position={[geoData?.lng, geoData?.lat]} />;
}
function MyUserMarker() {
  const { geoData, map } = useCoordinate();

  React.useEffect(() => {
    if (geoData && map) {
      map.setView({ lat: geoData.lat, lng: geoData.lng }, 5);
    }
  }, [map, geoData]);

  return <Marker icon={DefaultIcon} position={[geoData?.lat, geoData?.lng]} />;
}
function MyOtherUsers({ geoData }: { geoData: { lat: number; lng: number } }) {
  return <Marker icon={DefaultIcon} position={[geoData?.lat, geoData?.lng]} />;
} 
