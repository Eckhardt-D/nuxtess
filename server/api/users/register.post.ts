import { z, zh } from "h3-zod";
import { hash } from "argon2";
import jwt from "jsonwebtoken";
import { generateSecret } from "node-2fa";

export default defineEventHandler(async (event) => {
  try {
    const {
      auth: { jwtTokenSecret, authCookieExpirySeconds },
      public: {
        auth: { authCookieName },
      },
    } = useRuntimeConfig();

    const { db } = event.context;

    const body = await zh.useValidatedBody(event, {
      email: z.string().email(),
      name: z.string().max(100).min(1),
      password: z.string().min(8),
      passwordConfirm: z.string().min(8),
    });

    if (body.password !== body.passwordConfirm) {
      throw new Error("Passwords do not match.");
    }

    const hashed = await hash(body.password);

    const twoFactorSettings = generateSecret({
      account: body.name,
      name: useAppConfig().name ?? "Nuxtess App",
    });

    const user = await db.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: hashed,
        twoFactorSettings: {
          create: twoFactorSettings,
        },
      },
    });

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
