import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import middleware from "@/shared/middleware/all";
import onError from "@/shared/middleware/error";
import { Request } from "../types";
import { addressToCoordinates } from "@/shared/utils/adress-to-coord";

const handler = nc<Request, NextApiResponse>({
  onError,
});

handler.use(middleware);

handler.put(async (req, res) => {
  try {
    const { id, taskId, taskGroupId, address, city, zipCode } = req.body;
    const coords = await addressToCoordinates(address);

    await req.db.address.update({
      where: {
        id,
      },
      data: {
        address,
        city,
        zipCode,
        coords:JSON.stringify(coords)

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
