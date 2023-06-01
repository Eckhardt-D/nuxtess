export default defineAuthedEventHandler(async (event) => {
  return event.context.db.twoFactorSettings.update({
    where: {
      userId: event.context.user!.id,
    },
    data: {
      enabled: false,
    },
  });
});
