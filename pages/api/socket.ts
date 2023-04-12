import { fetcher } from "@/shared/api/client";
import { NextApiRequest, NextApiResponse } from "next";
import { Server } from "socket.io";
import { Request } from "./types";
import nc from "next-connect";
import middleware from "@/shared/middleware/all";
import onError from "@/shared/middleware/error";


const handler = nc<Request, NextApiResponse>({
  onError,
});

handler.use(middleware);

handler.get(async (req,res)=>{
  //@ts-expect-error
  if (res?.socket?.server.io) {
    console.log("Socket is already running");
    watchSocket(res.socket,req);
  } else {
    console.log("Socket is initializing");
    //@ts-expect-error
    const io = new Server(res?.socket?.server);
    //@ts-expect-error
    res.socket.server.io = io;

    io?.on("connection", (socket) => watchSocket(socket,req));
  }

  res.end();
})

let coords:any=[]

async function watchSocket(socket: any,req:Request) {
  const user=await req.db.user.findUnique({
    where:{
      id:req.user.id
    },
   
  })
  socket.on("coordinates", (coordinates: any) => {
    console.log(coordinates, "------");
    coords.push(coordinates)
    socket.emit('send',coords)

  });
}


export default handler;