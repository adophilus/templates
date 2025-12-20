import { Schema } from 'effect'

// Auth Config Schema
export const AuthConfigSchema = Schema.Struct({
  token: Schema.Struct({
    secret: Schema.String,
    access: Schema.Struct({
      expiry: Schema.Number
    }),
    refresh: Schema.Struct({
      expiry: Schema.Number
    }),
    signup: Schema.Struct({
      expiry: Schema.Number
    }),
    signin: Schema.Struct({
      expiry: Schema.Number
    })
  })
})

// Database Config Schema
export const DatabaseConfigSchema = Schema.Struct({
  url: Schema.String,
  prefix: Schema.String,
  migrationsFolder: Schema.String
})

// Environment Config Schema
export const EnvironmentConfigSchema = Schema.Struct({
  PRODUCTION: Schema.Boolean,
  STAGING: Schema.Boolean,
  DEVELOPMENT: Schema.Boolean,
  TEST: Schema.Boolean
})

// Mail Config Schema
export const MailConfigSchema = Schema.Struct({
  url: Schema.String,
  sender: Schema.Struct({
    name: Schema.String,
    email: Schema.String
  }),
  support: Schema.Struct({
    name: Schema.String,
    email: Schema.String
  })
})

export const ServerConfigSchema = Schema.Struct({
  port: Schema.Number,
  url: Schema.String
})

export class AppConfigSchema extends Schema.Class<AppConfigSchema>('ConfigSchema')({
  auth: AuthConfigSchema,
  db: DatabaseConfigSchema,
  environment: EnvironmentConfigSchema,
  mail: MailConfigSchema,
  server: ServerConfigSchema
}) {}
