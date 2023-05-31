import * as jwt from "jsonwebtoken";

/**
 * Make the user globally available within event handlers
 * if the authentication token is passed along.
 */
export default defineEventHandler(async (event) => {
  const {
    auth: { jwtTokenSecret },
  } = useRuntimeConfig();

  const header = getHeader(event, "authorization");
  const token = header?.split(" ")[1];

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
