import { Context, Effect, Layer, Schema } from 'effect'
import { Env } from './env'

export const EnvironmentConfigSchema = Schema.Struct({
  isProduction: Schema.Boolean,
  isStaging: Schema.Boolean,
  isDevelopment: Schema.Boolean,
  isTesting: Schema.Boolean
})

export const ServerConfigSchema = Schema.Struct({
  url: Schema.String
})

export class AppConfigSchema extends Schema.Class<AppConfigSchema>(
  'AppConfigSchema'
)({
  environment: EnvironmentConfigSchema,
  server: ServerConfigSchema
}) {}

export class AppConfig extends Context.Tag('AppConfig')<
  AppConfig,
  AppConfigSchema
>() {}

export const AppConfigLive = Layer.effect(
  AppConfig,
  Effect.gen(function* () {
    const env = yield* Env

    const config = {
      environment: {
        isProduction: env.VITE_NODE_ENV === 'production',
        isStaging: env.VITE_NODE_ENV === 'staging',
        isDevelopment: env.VITE_NODE_ENV === 'development',
        isTesting: env.VITE_NODE_ENV === 'test'
      },
      server: {
        url: env.VITE_SERVER_URL
      }
    }

    return yield* Schema.decodeUnknown(AppConfigSchema)(config)
  })
)
