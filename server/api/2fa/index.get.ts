export default defineAuthedEventHandler(async (event) => {
  const user = event.context.user!;
  const twoFactorSettings = await event.context.db.twoFactorSettings.findFirst({
    where: {
      userId: user.id,
    },
  });
  return twoFactorSettings;
});
