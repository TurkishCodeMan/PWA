import { NextApiRequest, NextApiResponse } from "next";
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
    const { id, taskId, taskGroupId, address, city, zipCode } = req.body;
    console.log(id, "IDD");
    await req.db.address.update({
      where: {
        id,
      },
      data: {
        address,
        city,
        zipCode,
      },
    });
    res.status(201).json({ message: "Address Update" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
    return error;
  }
});

export default handler;
