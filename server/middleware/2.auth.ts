import * as jwt from "jsonwebtoken";
import type {User} from "@prisma/client";


declare module "h3" {
  interface H3EventContext {
    user?: Omit<User, "password">
  }
}

/**
 * Make the user globally available within event handlers
 * if the authentication token is passed along.
 */
export default defineEventHandler(async (event) => {
  const {
    auth: { jwtTokenSecret },
    public: { auth: { authCookieName } }
  } = useRuntimeConfig();

  const cookie = getCookie(event, authCookieName);
  const token = cookie;

  if (token === undefined) {
    return;
  }

  try {
    const verified = jwt.verify(token, jwtTokenSecret) as { id: string };
    const user = await event.context.db.user.findFirstOrThrow({
      where: {
        id: verified.id,
      },
    });
    event.context.user = exclude(user, ["password"]);
  } catch (_) {
    /* Do nothing, token likely expired */
  }
});
