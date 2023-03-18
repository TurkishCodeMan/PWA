import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { withAuth } from "next-auth/middleware";
const PUBLIC_FILE = /\.(.*)$/;

// had to make this again here as the other one is in a file with bcrypt which is not supported on edge runtimes
const verifyJWT = async (jwt: string) => {
  const { payload } = await jwtVerify(
    jwt,
    new TextEncoder().encode(process.env.JWT_SECRET)
  );

  return payload;
};

export default withAuth(
  function middleware(req) {
    // return NextResponse.rewrite(new URL('/admin',req.url))
    const pathname = req.nextUrl.pathname;

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
    if (req.nextauth.token && pathname === "/") {
      req.nextUrl.pathname = "/home";
      return NextResponse.redirect(req.nextUrl);
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        console.log(token)
        if (token?.role === "PUBLIC") {
          return true;
        }
        return false;
      },
    },
  }
);

export const config = { matcher: ["/entry", "/home", "/"] };
// export default async function middleware(req: NextRequest, res: NextResponse) {
//   const { pathname } = req.nextUrl;

//   if (
//     pathname.startsWith("/_next") ||
//     pathname.startsWith("/api") ||
//     pathname.startsWith("/static") ||
//     pathname.startsWith("/signin") ||
//     pathname.startsWith("/signup") ||
//     PUBLIC_FILE.test(pathname)
//   ) {
//     return NextResponse.next();
//   }

//   const jwt = req.cookies.get(process.env.COOKIE_NAME as string);

//   if (jwt && pathname === "/") {
//     req.nextUrl.pathname = "/home";
//     return NextResponse.redirect(req.nextUrl);
//   }

//   if (!jwt) {
//     req.nextUrl.pathname = "/signin";
//     return NextResponse.redirect(req.nextUrl);
//   }

//   try {
//     await verifyJWT(jwt.value);
//     return NextResponse.next();
//   } catch (e) {
//     console.error(e);
//     req.nextUrl.pathname = "/signin";
//     return NextResponse.redirect(req.nextUrl);
//   }
// }
