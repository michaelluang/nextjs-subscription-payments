import { createMiddlewareSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { NextRequest, NextResponse } from 'next/server'
import { getServerSideConfig } from './app/config/server';
import md5 from 'spark-md5';

import type { Database } from 'types-db'

export const config = {
  matcher: ["/api/openai", "/api/chat-stream", "/chat/:path*"],
};

const serverConfig = getServerSideConfig();

function getIP(req: NextRequest) {
  let ip = req.ip ?? req.headers.get("x-real-ip");
  const forwardedFor = req.headers.get("x-forwarded-for");

  if (!ip && forwardedFor) {
    ip = forwardedFor.split(",").at(0) ?? "";
  }

  return ip;
}

export async function middleware(req: NextRequest) {
	const accessCode = req.headers.get("access-code");
  const token = req.headers.get("token");
  const hashedCode = md5.hash(accessCode ?? "").trim();

  console.log("[Auth] allowed hashed codes: ", [...serverConfig.codes]);
  console.log("[Auth] got access code:", accessCode);
  console.log("[Auth] hashed access code:", hashedCode);
  console.log("[User IP] ", getIP(req));
  console.log("[Time] ", new Date().toLocaleString());

	if (serverConfig.needCode && !serverConfig.codes.has(hashedCode) && !token) {
    return NextResponse.json(
      {
        error: true,
        needAccessCode: true,
        msg: "Please go settings page and fill your access code.",
      },
      {
        status: 401,
      },
    );
  }

	// inject api key
  if (!token) {
    const apiKey = serverConfig.apiKey;
    if (apiKey) {
      console.log("[Auth] set system token");
      req.headers.set("token", apiKey);
    } else {
      return NextResponse.json(
        {
          error: true,
          msg: "Empty Api Key",
        },
        {
          status: 401,
        },
      );
    }
  } else {
    console.log("[Auth] set user token");
  }

	// supabase auth
  const res = NextResponse.next({
    request: {
      headers: req.headers,
    },
	});
  const supabase = createMiddlewareSupabaseClient<Database>({ req, res });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session?.user) {
    return res;
  }

  // Auth condition not met, redirect to home page.
	const pathname = req.nextUrl.pathname;
	if (pathname.startsWith("/chat")) {
		const redirectUrl = req.nextUrl.clone();
		redirectUrl.pathname = '/signin';
		redirectUrl.searchParams.set(`redirectedFrom`, req.nextUrl.pathname);
		return NextResponse.redirect(redirectUrl);
	}


	return NextResponse.json(
		{
			error: true,
			msg: "Unauthorized",
		},
		{
			status: 401,
		},
	);
}
