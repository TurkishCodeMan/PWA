import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

import { getToken } from "next-auth/jwt";

const secret = process.env.JWT_SECRET;
const PUBLIC_FILE = /\.(.*)$/;

// had to make this again here as the other one is in a file with bcrypt which is not supported on edge runtimes
const verifyJWT = async (jwt: string) => {
  const { payload } = await jwtVerify(
    jwt,
    new TextEncoder().encode(process.env.JWT_SECRET)
  );

  return payload;
};


export default async function middleware(req: NextRequest, res: NextResponse) {
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/signin") ||
    pathname.startsWith("/signup") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }
  const jwt = await getToken({ req, secret });

  console.log("JSON Web Token", jwt);

  //Home Page Settings
  if (jwt && pathname === "/") {
    req.nextUrl.pathname = "/home";
    return NextResponse.redirect(req.nextUrl);
  }

  //After Save Settings
  if (jwt && jwt.role !== "PUBLIC" && pathname != "/home") {
    req.nextUrl.pathname = "/home";
    return NextResponse.redirect(req.nextUrl);
  }

  
  if (!jwt) {
    req.nextUrl.pathname = "/signin";
    return NextResponse.redirect(req.nextUrl);
  }

  try {
    return NextResponse.next();
  } catch (e) {
    req.nextUrl.pathname = "/signin";
    return NextResponse.redirect(req.nextUrl);
  }
}
