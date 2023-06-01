export default defineEventHandler(async (event) => {
  return {
    data: event.context.user ?? null,
    error: null,
  }
});