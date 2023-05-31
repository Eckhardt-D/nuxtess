import { env } from "node:process";

export default defineNuxtConfig({
  css: ["~/assets/main.css"],
  postcss: {
    plugins: {
      autoprefixer: {},
      tailwindcss: {},
    },
  },
  runtimeConfig: {
    auth: {
      jwtTokenSecret: env.JWT_TOKEN_SECRET,
      authCookieExpirySeconds: Number(
        env.AUTH_COOKIE_EXPIRY_SECONDS ?? 21 * 24 * 60 * 60
      ),
    },
    public: {
      auth: Object.freeze({
        authCookieName: env.AUTH_COOKIE_NAME ?? "nuxtess_token",
      }),
    },
  },
  nitro: {
    storage: {
      redis: {
        driver: "redis",
        port: Number(env.REDIS_PORT),
        host: env.REDIS_HOST,
      },
    },
  },
});
