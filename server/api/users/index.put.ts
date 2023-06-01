import { zh, z } from "h3-zod";

export default defineAuthedEventHandler(async (event) => {
  try {
    const payload = await zh.useValidatedBody(event, {
      name: z.string().max(100).min(1).optional(),
      email: z.string().email().optional(),
    });

    const update: any = {};

    if (payload.name !== undefined) {
      update.name = payload.name;
    }

    // TODO: please do email validation bruh
    if (payload.email !== undefined) {
      update.email = payload.email;
    }

    const updatedUser = await event.context.db.user.update({
      where: {
        id: event.context.user!.id,
      },
      data: update,
    });

    return { data: exclude(updatedUser, ["password"]), error: null };
  } catch (error) {
    return {
      data: null,
      // TODO: f this
      error: (error as Error).message,
    };
  }
});
