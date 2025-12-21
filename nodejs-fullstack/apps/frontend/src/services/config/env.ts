import { Config, ConfigProvider, Context, Effect, Layer, Schema } from 'effect'

export class EnvSchema extends Schema.Class<EnvSchema>('EnvSchema')({
  VITE_NODE_ENV: Schema.Literal('production', 'staging', 'development', 'test'),
  VITE_SERVER_URL: Schema.String
}) {}

export class Env extends Context.Tag('Env')<Env, EnvSchema>() {}

export const EnvLive = Layer.effect(
  Env,
  Effect.gen(function* () {
    const rawConfig = {
      VITE_NODE_ENV: yield* Config.string('VITE_NODE_ENV'),
      VITE_SERVER_URL: yield* Config.string('VITE_SERVER_URL')
    }

    const validatedEnv = yield* Schema.decodeUnknown(EnvSchema)(rawConfig)
    return validatedEnv
  })
).pipe(
  Layer.provide(
    Layer.setConfigProvider(
      ConfigProvider.fromMap(new Map(Object.entries(import.meta.env)))
    )
  )
)
