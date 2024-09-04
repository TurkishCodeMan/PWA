import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import middleware from "@/shared/middleware/all";
import onError from "@/shared/middleware/error";
import { Request } from "../types";

const handler = nc<Request, NextApiResponse>({
  onError,
});

handler.use(middleware);


//TODO SELECTED COMPANY FEATURE ADDED WİTH CONTEXT API
handler.get(async (req, res) => {
  try {
    
    const companies = await req.db.company.findMany({
    include:{
        employees:true,
        owners:true
    },
  
    });
    res.status(201).json(companies);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
    return error;
  }
});

export default handler;
