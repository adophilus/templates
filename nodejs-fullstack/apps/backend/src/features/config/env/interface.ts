import { Context, Schema } from 'effect'

// Define the schema for all raw environment variables
export class EnvSchema extends Schema.Class<EnvSchema>('EnvSchema')({
  NODE_ENV: Schema.Literal('production', 'staging', 'development', 'test'),
  AUTH_TOKEN_SECRET: Schema.String,
  DATABASE_URL: Schema.String,
  DATABASE_PREFIX: Schema.NullOr(Schema.String),
  DATABASE_MIGRATIONS_FOLDER: Schema.String,
  MAIL_URL: Schema.String,
  MAIL_SENDER_NAME: Schema.String,
  MAIL_SENDER_EMAIL: Schema.String,
  MAIL_SUPPORT_NAME: Schema.String,
  MAIL_SUPPORT_EMAIL: Schema.String,
  SERVER_PORT: Schema.Number,
  SERVER_URL: Schema.String
}) {}

// Define the service tag for accessing validated environment variables
export class Env extends Context.Tag('Env')<Env, EnvSchema>() {}
