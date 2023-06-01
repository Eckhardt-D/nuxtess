# Nuxtess

A starter for production Nuxt3 SaaS applications.

# Getting started (local development)

The docker inclusion is just a nice to have and not a necessity. It's specifically to ease use of Redis and MySQL in local development. In a production environment you should use a production DATABASE_URL in your .env.

```bash
pnpm install
```

## Update app.config.ts with your app details

```ts
export default defineAppConfig({
  // Used in e.g. 2FA app name
  name: 'Your App Name'
})
```

## Update necessary items in .env

```
AUTH_COOKIE_EXPIRY_SECONDS=
AUTH_COOKIE_NAME=
JWT_TOKEN_SECRET=
```

## Start the database servers

```bash
docker compose up
```

## Run the migrations

This will run all the existing migrations, which is required for things like auth etc.

```bash
npx prisma migrate deploy
```

## Note on migrations

You can always create your own migrations, but the existing models need to remain as is (you can add properties but not remove) for auth to work

```bash
npx prisma migrate dev --name <migration_name>
```