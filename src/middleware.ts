import { defineMiddleware } from "astro:middleware";

const applySecurityHeaders = (response: Response): Response => {
  const headers = new Headers(response.headers);

  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("X-Frame-Options", "DENY");
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  headers.set("Cross-Origin-Opener-Policy", "same-origin");
  headers.set("Cross-Origin-Resource-Policy", "same-site");
  headers.set("X-Permitted-Cross-Domain-Policies", "none");

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
};

export const onRequest = defineMiddleware(async (context, next) => {
  const requestUrl = new URL(context.request.url);

  if (requestUrl.hostname.toLowerCase() === "cruzandomeridianos.com") {
    requestUrl.hostname = "www.cruzandomeridianos.com";
    requestUrl.protocol = "https:";

    return applySecurityHeaders(
      Response.redirect(requestUrl.href, 301),
    );
  }

  return applySecurityHeaders(await next());
});
