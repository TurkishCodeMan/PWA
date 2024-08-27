"use client";
import { io } from "socket.io-client";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import React from "react";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-boundary-canvas";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

import { useAllTaskGroups, useGetTaskById } from "@/entities/task/model";
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

// export let socket = io();

export default function Map() {
  const [coords, setCoords] = React.useState([]);
  const { data, isLoading } = useAllTaskGroups();
  const tasksList = data?.map((board) => board.tasks).flat();
  console.log(tasksList);



  return (
<<<<<<< HEAD
    <MapContainer zoom={20} style={{ height: "100vh" }}>
=======
    <MapContainer  zoom={20} style={{ height: "40vh" }}>
>>>>>>> c0bdcbdfc48309ba0fa9ad56effe1653e58fe03f
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        
      />
      {tasksList?.map((task) => (
        <MyTask key={task.id} coords={task?.address?.coords as string} />
      ))}
      {coords.map((val) => (
        <MyOtherUsers geoData={val} />
      ))}
    </MapContainer>
  );
}

 function coordToJson(coords: string) {

  return coords.split(',').map(v=>parseFloat(v));
}

function MyTask({ coords }: { coords: string }) {
  const [geoData, setGeoData] = React.useState({ lat: 0, lng: 0 });
  const map = useMap();
  React.useEffect(() => {
    async function revised() {
      const coord = coordToJson(coords as string);
      setGeoData({ lat: coord[0], lng: coord[1] });
    }
    if (coords) revised();
  }, [coords]);

  React.useEffect(() => {
    if (geoData && map) {
      map.setView({ lat: geoData.lat, lng: geoData.lng }, 5);
    }
  }, [map, geoData, coords]);
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
