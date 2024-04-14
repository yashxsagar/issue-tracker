export { default } from "next-auth/middleware";

//A configuration object wihc determines which routes are protected routes

export const config = {
  matcher: ["/issues/edit/:id+", "/issues/new", "/issues/[id]/:path*"],
};
