import { z } from 'zod'

const baseEnv = z.object({
  NODE_ENV: z.enum(['production', 'staging', 'development', 'test']),
  SERVER_PORT: z.coerce.number().min(0).max(65535),
  MAIL_URL: z.url(),
  MAIL_SENDER_NAME: z.string(),
  MAIL_SENDER_EMAIL: z.email(),
  MAIL_SUPPORT_NAME: z.string(),
  MAIL_SUPPORT_EMAIL: z.email(),
  SERVER_URL: z.string(),
  AUTH_TOKEN_SECRET: z.string().min(32)
})

const sqliteDatabaseEnv = baseEnv.safeExtend({
  DATABASE_PROVIDER: z.literal('sqlite'),
  DATABASE_PREFIX: z.string().optional(),
  DATABASE_URL: z.string()
})

const pgDatabaseEnv = baseEnv.safeExtend({
  DATABASE_PROVIDER: z.literal('postgres'),
  DATABASE_PREFIX: z.string().optional(),
  DATABASE_URL: z.url()
})

const pgliteDatabaseEnv = baseEnv.safeExtend({
  DATABASE_PROVIDER: z.literal('pglite'),
  DATABASE_PREFIX: z.string().optional(),
  DATABASE_URL: z.string()
})

export const env = z.union([
  sqliteDatabaseEnv,
  pgDatabaseEnv,
  pgliteDatabaseEnv
])
