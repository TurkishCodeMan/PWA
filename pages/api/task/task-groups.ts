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

function sortingByOrder(arr:any,v:any){
 return [...arr.filter((n:any)=>n.order<v.order),v,...arr.filter((n:any)=>n.order>v.order)]
}
  

handler.get(async (req, res) => {
  try {
    const tasks = await req.db.taskGroup.findMany({
      orderBy:{
        order:'asc'
      },
      where: {
        company: {
          owners: {
            every:{
              id: req.user.id,
            }
          },
        },
      },
      
      include: {
        company: true,
        tasks: {
          include: {
            users: true,
            address:true,
            owner:true
          },
        },
        
      },
    });

   

    res.status(201).json(tasks);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
    return error;
  }
});

handler.put(async (req, res) => {
  try {
    const { taskId, destinationGroupId, sourceGroupId } = req.body;
    await req.db.task.update({
        where: {
            id:taskId
        },
        data: {
            taskGroupId:destinationGroupId
        }
    })
    res.status(201).json({message:'Update Task Group'});
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
    return error;
  }
});

export default handler;
