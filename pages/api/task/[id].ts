import { NextApiResponse } from "next";
import nc from "next-connect";
import middleware from "@/shared/middleware/all";
import onError from "@/shared/middleware/error";
import { Request } from "../types";

const handler = nc<Request, NextApiResponse>({
  onError,
});

handler.use(middleware);
handler.get(async (req, res) => {
  try {
    const { id } = req.query;
    console.log('id',id)
    const task = await req.db.task.findUnique({
      where: {
        id: id as string,
      },

      include: {
        users: true,
        address: true,
        owner: true,
      },
    });
    res.status(201).json(task);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
    return error;
  }
});

export default handler;
