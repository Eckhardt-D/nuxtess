const ALLOWED_ROUTE_PREFIXES = ["/auth"];
export default defineNuxtRouteMiddleware(async (to, from) => {
  const isAllowed = ALLOWED_ROUTE_PREFIXES.some((route) => {
    return to.fullPath.match(new RegExp(`^${route}`));
  });

  if (isAllowed) {
    return;
  }

  const { refresh, getTwoFactorAuthSettings } = useUser();
  const user = await refresh();

  if (user === null) {
    return navigateTo("/auth/login");
  }

  const twoFactorSettings = await getTwoFactorAuthSettings();

  if (twoFactorSettings?.enabled) {
    return navigateTo("/auth/2fa");
  }
});
