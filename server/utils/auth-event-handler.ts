import type { EventHandler } from "h3";

export const defineAuthedEventHandler = <T>(callback: EventHandler<T>) => {
  return defineEventHandler((event) => {
    if (!event.context.user) {
      throw createError({
        statusCode: 401,
        message: "UNAUTHORIZED",
      });
    }
    return callback(event);
  });
};
