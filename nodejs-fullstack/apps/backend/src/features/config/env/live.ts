import { Config, Effect, Layer, Schema, Option } from 'effect'
import { Env, EnvSchema } from './interface'

export const EnvLive = Layer.effect(
  Env,
  Effect.gen(function* () {
    const rawConfig = {
      NODE_ENV: yield* Config.string('NODE_ENV'),
      AUTH_TOKEN_SECRET: yield* Config.string('AUTH_TOKEN_SECRET'),
      DATABASE_URL: yield* Config.string('DATABASE_URL'),
      DATABASE_PREFIX: yield* Config.option(
        Config.string('DATABASE_PREFIX')
      ).pipe(Config.map(Option.getOrNull)),
      DATABASE_MIGRATIONS_FOLDER: yield* Config.string(
        'DATABASE_MIGRATIONS_FOLDER'
      ),
      MAIL_URL: yield* Config.string('MAIL_URL'),
      MAIL_SENDER_NAME: yield* Config.string('MAIL_SENDER_NAME'),
      MAIL_SENDER_EMAIL: yield* Config.string('MAIL_SENDER_EMAIL'),
      MAIL_SUPPORT_NAME: yield* Config.string('MAIL_SUPPORT_NAME'),
      MAIL_SUPPORT_EMAIL: yield* Config.string('MAIL_SUPPORT_EMAIL'),
      SERVER_PORT: yield* Config.number('SERVER_PORT'),
      SERVER_URL: yield* Config.string('SERVER_URL')
    }

    const validatedEnv = yield* Schema.decodeUnknown(EnvSchema)(rawConfig)
    return validatedEnv
  })
)
