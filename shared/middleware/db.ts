import { db } from "../utils/db";

export default async (req: any, res: any, next: any) => {
  req.db = db;

  next();
};
