import { createJWT } from "@/shared/utils/auth";
import { db } from "@/shared/utils/db";
import { hashPassword } from "@/shared/utils/hash-pass";
import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const user = await db.user.create({
      data: {
        email: req.body.email,
        password: await hashPassword(req.body.password),
        name: req.body.name,
        lastName: req.body.lastName,
        image:''
      },
    });

    // const jwt = await createJWT(user);

    // res.setHeader(
    //   "Set-Cookie",
    //   serialize(process.env.COOKIE_NAME as string, jwt, {
    //     httpOnly: true,
    //     path: "/",
    //     maxAge: 60 * 60 * 24 * 7,
    //   })
    // );
    res.status(201);
    res.json({...user});
  } else {
    res.status(401);
    res.json({});
  }
}
