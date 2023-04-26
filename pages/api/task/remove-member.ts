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
    const { members, id } = req.body;

    await Promise.all([
      ...members.map(async (email: string) => {
        return req.db.task.update({
          where: {
            id: id,
          },
          data: {
            users: {
              disconnect: {
                email: email,
              },
            },
          },
        });
      }),
    ]);
    res.status(201).json({ message: "Add Members Task" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
    return error;
  }
});

export default handler;
