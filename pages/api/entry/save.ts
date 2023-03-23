import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import middleware from "@/shared/middleware/all";
import onError from "@/shared/middleware/error";
import { Company, PrismaClient } from "@prisma/client";
import { Request } from "../types";

const handler = nc<Request, NextApiResponse>({
  onError,
});

handler.use(middleware);

type SavetTaskType = {
  db: PrismaClient;
  group: any;
  taskType: string;
  company: Company;
};

async function saveTaskGroup({
  db,
  group,
  taskType = "employee",
  company,
}: SavetTaskType) {
  await db.taskGroup.create({
    data: {
      name: group?.name,
      companyId: company.id,

      type:
        taskType == "employee"
          ? "EMPLOYEE_TASKGROUP"
          : "SUBCONTRACTER_TASKGROUP",
    },
  });
}

handler.post(async (req, res) => {
  const {
    companyName,
    howManyEmployeeSize,
    howManySubContracterSize,
    groupsEmployees,
    groupsSubContracters,
  } = req.body;
  console.log(req.user);
  try {
    //Save company
    const company = await req.db.company.create({
      data: {
        name: companyName,
        ownerId: req.user.id,
      },
    });
    //Save TaskGroup
    await Promise.all([
      ...groupsEmployees.map((val: any) =>
        saveTaskGroup({
          db: req.db,
          group: val,
          taskType: "employee",
          company,
        })
      ),
    ]);
    await Promise.all([
      ...groupsSubContracters.map((val: any) =>
        saveTaskGroup({
          db: req.db,
          group: val,
          taskType: "subcontracters",
          company,
        })
      ),
    ]);

    //UPDATE USER ROLEE

    await req.db.user.update({
      where: {
        id: req.user.id,
      },
      data: {
        role: "EMPLOYER",
      },
    });

    res.status(201).json({ ...req.user, company });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
    return error;
  }
});

export default handler;
