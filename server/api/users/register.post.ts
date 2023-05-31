import { z, zh } from "h3-zod";
import { hash } from "argon2";
import * as jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
  const {
    auth: { jwtTokenSecret, authCookieExpirySeconds },
    public: { authCookieName },
  } = useRuntimeConfig();

  const { db } = event.context;

  const body = await zh.useValidatedBody(event, {
    email: z.string().email(),
    name: z.string().max(100),
    password: z.string().min(8),
    passwordConfirm: z.string().min(8),
  });

  if (body.password !== body.passwordConfirm) {
    return createError({
      status: 401,
      message: "Passwords do not match",
    });
  }

  const hashed = await hash(body.password);

  const user = await db.user.create({
    data: {
      name: body.name,
      email: body.email,
      password: hashed,
    },
  });

  const token = jwt.sign(user, jwtTokenSecret, {
    expiresIn: authCookieExpirySeconds,
  });

  setCookie(event, authCookieName, token, {
    httpOnly: true,
    maxAge: authCookieExpirySeconds,
  });

  return exclude(user, ["password"]);
});
