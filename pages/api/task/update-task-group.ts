import { NextApiResponse } from "next";
import nc from "next-connect";
import middleware from "@/shared/middleware/all";
import onError from "@/shared/middleware/error";
import { Request } from "../types";
import { Task, TaskGroup } from "@prisma/client";

const handler = nc<Request, NextApiResponse>({
  onError,
});

handler.use(middleware);


handler.put(async (req, res) => {
  try {
    const { id, newOrder } = req.body;
    await req.db.taskGroup.update({
        where: {
           id:id
        },
        data: {
            order:newOrder
        }
    })
    res.status(201).json({message:'Update Task Group Order'});
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
    return error;
  }
});

export default handler;
