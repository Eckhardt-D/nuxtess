export default defineEventHandler((event) => {
  const { public: { auth: { authCookieName } } } = useRuntimeConfig();

  deleteCookie(event, authCookieName, {
    httpOnly: true,
  });

  return sendRedirect(event, "/auth/login");
});