export default defineAuthedEventHandler(async (event) => {
  const {
    public: {
      auth: { authCookieName },
    },
  } = useRuntimeConfig();

  await event.context.db.twoFactorSettings.update({
    where: {
      userId: event.context.user!.id,
    },
    data: {
      verified: false,
    },
  });

  deleteCookie(event, authCookieName, {
    httpOnly: true,
  });

  return sendRedirect(event, "/auth/login");
});
