import type { EventHandler, EventHandlerRequest } from "h3";

export const defineAuthedEventHandler = <T extends EventHandlerRequest, R>(
  handler: EventHandler<T, R>
) => {
  return defineEventHandler((event) => {
    if (!event.context.user) {
      throw createError({
        statusCode: 401,
        message: "UNAUTHORIZED",
      });
    }
    return handler(event);
  });
};
