import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import middleware from "@/shared/middleware/all";
import onError from "@/shared/middleware/error";
import { Request } from "./types";


const handler = nc<Request, NextApiResponse>({
  onError,
});

handler.use(middleware);



handler.get(async (req, res) => {
  try {
  const user=await req.db.user.findUnique({
    where :{
      id:req.user.id
    }
  })
  res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
    return error;
  }
});

export default handler;
