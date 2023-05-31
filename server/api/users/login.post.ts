import { zh, z } from "h3-zod";
import { verify } from "argon2";

export default defineEventHandler(async (event) => {
  try {
    const body = await zh.useValidatedBody(event, {
      email: z.string().email(),
      password: z.string(),
    });

    const user = await event.context.db.user.findFirstOrThrow({
      where: {
        email: body.email,
      },
    });

    const isValid = verify(user.password!, body.password);

    if (!isValid) {
      throw new Error("Invalid account details");
    }

    return {
      data: exclude(user, ["password"]),
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: (error as Error).message,
    };
  }
});
