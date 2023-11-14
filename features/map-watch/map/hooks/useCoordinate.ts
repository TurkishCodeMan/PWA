import { useMap } from "react-leaflet";
import React from "react";
// import { socket } from "..";

export function useCoordinate() {
  const [geoData, setGeoData] = React.useState({ lat: 0, lng: 0 });

  const map = useMap();
  async function socketInitializer() {
    await fetch("/api/socket");
  }
  // async function sendCoordinates() {
  //   socket.emit("coordinates", geoData);
  // }

  function success(pos: any) {
    const crd = pos.coords;
    setGeoData({ lat: crd.latitude, lng: crd.longitude });
  }

  function error(err: any) {
    console.error(`ERROR(${err.code}): ${err.message}`);
  }
  React.useEffect(() => {
    socketInitializer();
  }, []);
  

  React.useEffect(() => {
    // sendCoordinates();
  }, [map, geoData]);


  React.useEffect(() => {
    const options = {
      enableHighAccuracy: true,
      timeout: 1000,
    };
    const id = navigator.geolocation.watchPosition(success, error, options);
    return () => navigator.geolocation.clearWatch(id);
  }, [navigator.geolocation]);


  return {geoData,map}
}
