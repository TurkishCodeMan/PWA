import { NextApiResponse } from "next";
import nc from "next-connect";
import middleware from "@/shared/middleware/all";
import onError from "@/shared/middleware/error";
import { Request } from "../types";

const handler = nc<Request, NextApiResponse>({
  onError,
});

handler.use(middleware);

handler.post(async (req, res) => {
  try {
    const { address, city, zipCode,coords, startDate, endDate, taskGroupId } =
      req.body;

    const addressa = await req.db.address.create({
      data: {
        address,
        city,
        zipCode,
        coords:coords.map((coord:number) =>coord.toString()).join(','),
        
      },
    });
    const task = await req.db.task.create({
      data: {
        addressId: addressa.id,
        ownerId: req.user.id,
        startDate,
        endDate,
        taskGroupId,
      },
    });
    res.status(201).json({
      message: "Create Task With Address",
      task: task,
      address: addressa,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
    return error;
  }
});

handler.put(async (req, res) => {
  try {
    const { startDate, endDate, id } = req.body;
    const task = await req.db.task.update({
      where: {
        id: id,
      },
      data: {
        startDate: startDate,
        endDate: endDate,
      },
    });
    res.status(201).json({ message: "Update Task", task: task });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
    return error;
  }
});
handler.delete(async (req, res) => {
  try {
    const { id } = req.body;
    const task = await req.db.task.delete({
      where: {
        id: id,
      },
    });
    res.status(201).json({ message: "Delete Task", task: task });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
    return error;
  }
});
export default handler;
