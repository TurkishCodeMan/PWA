import { fetcher } from "@/shared/api/client";
import { NextApiRequest, NextApiResponse } from "next";
import { Server } from "socket.io";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  //@ts-expect-error
  if (res?.socket?.server.io) {
    console.log("Socket is already running");
    watchSocket(res.socket);
  } else {
    console.log("Socket is initializing");
    //@ts-expect-error
    const io = new Server(res?.socket?.server);
    //@ts-expect-error
    res.socket.server.io = io;

    io?.on("connection", (socket) => watchSocket(socket));
  }

  res.end();
}

async function watchSocket(socket: any) {
  socket.on("coordinates", (coordinates: any) => {
    console.log(coordinates, "------");
    socket.broadcast.emit('send',coordinates)

  });
}
