import { createJWT } from "@/shared/utils/auth";
import { db } from "@/shared/utils/db";
import { comparePasswords } from "@/shared/utils/hash-pass";
import { serialize } from "cookie";
import { NextApiRequest, NextApiResponse } from "next/types";

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const user = await db.user.findUnique({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      res.status(401);
      res.json({ error: "User Not Found" });
      return;
    }

    const isUser = await comparePasswords(req.body.password, user?.password as string);

    if (isUser) {
      const jwt = await createJWT(user);
      res.setHeader(
        "Set-Cookie",
        serialize(process.env.COOKIE_NAME as string, jwt, {
          httpOnly: true,
          path: "/",
          maxAge: 60 * 60 * 24 * 7,
        })
      );
      res.status(201);
      res.json({});
    } else {
      res.status(401);
      res.json({ error: "Invalid login password error !" });
    }
  } else {
    res.status(402);
    res.json({error:'Method not allowed'});
  }
}
