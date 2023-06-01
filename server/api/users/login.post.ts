import { zh, z } from "h3-zod";
import { verify } from "argon2";
// @ts-expect-error
import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
  try {
    const {
      auth: { jwtTokenSecret, authCookieExpirySeconds },
      public: {
        auth: { authCookieName },
      },
    } = useRuntimeConfig();

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

    const token = jwt.sign(user, jwtTokenSecret, {
      expiresIn: authCookieExpirySeconds,
    });

    setCookie(event, authCookieName, token, {
      httpOnly: true,
      maxAge: authCookieExpirySeconds,
    });

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
