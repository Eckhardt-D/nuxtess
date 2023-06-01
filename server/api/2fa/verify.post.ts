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

  if (verifyToken(userSettings.secret, body.otp)) {
    return {
      data: true,
      error: null,
    };
  }

  throw createError({
    statusCode: 401,
    message: "Could not verify code, please try again",
  });
});
