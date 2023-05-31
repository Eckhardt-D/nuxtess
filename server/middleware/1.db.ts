import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

declare module "h3" {
  interface H3EventContext {
    db: typeof client;
  }
}

export default defineEventHandler(async (event) => {
  event.context.db = client;
});
