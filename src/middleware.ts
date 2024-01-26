import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import getUser from "./lib/services/dashboard/getUser";

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get('Authentication')?.value;
  const test = request.cookies.get('SSID')?.value;

  console.log({ test });
  // console.log('request cookies', request.headers);
  console.log({ currentUser });

  const auth = getUser();

  // console.log({ auth });

  // if (auth) {
  //   return NextResponse.redirect(new URL('/dashboard', request.url));
  // }
  // return NextResponse.redirect(new URL('/auth/login', request.url));
}

export const config = {
  matcher: ['/dashboard']
};
// matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],