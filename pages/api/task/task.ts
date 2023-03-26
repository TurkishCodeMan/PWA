import { NextApiResponse } from "next";
import nc from "next-connect";
import middleware from "@/shared/middleware/all";
import onError from "@/shared/middleware/error";
import { Request } from "../types";

const handler = nc<Request, NextApiResponse>({
  onError,
});

handler.use(middleware);


handler.put(async (req, res) => {
  try {
    const { startDate,endDate,id } = req.body;
   const task= await req.db.task.update({
        where: {
            id:id
        },
        data: {
            startDate:startDate,
            endDate:endDate
        }
    })
    res.status(201).json({message:'Update Task',task:task});
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
    return error;
  }
});

export default handler;
