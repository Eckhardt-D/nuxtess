import { z, zh } from "h3-zod";
import { verifyToken } from "node-2fa";

export default defineAuthedEventHandler(async (event) => {
  const body = await zh.useValidatedBody(event, {
    otp: z.string().max(10),
  });

  const userSettings =
    await event.context.db.twoFactorSettings.findFirstOrThrow({
      where: {
        userId: event.context.user!.id,
      },
    });

  const verified = verifyToken(userSettings.secret, body.otp);

  if (verified === null) {
    throw createError({
      statusCode: 401,
      message: "Incorrect OTP, please try again.",
    });
  }

  const updatedSettings = await event.context.db.twoFactorSettings.update({
    where: {
      id: userSettings.id,
    },
    data: {
      enabled: true,
    },
  });

  return {
    data: updatedSettings,
  };
});
