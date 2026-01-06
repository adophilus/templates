import { Effect, Layer, Schema } from 'effect'
import { AppConfig } from './interface'
import { AppConfigSchema } from './schema'
import { Env } from '../env'

export const AppConfigLive = Layer.effect(
  AppConfig,
  Effect.gen(function* () {
    const env = yield* Env

    const config = {
      auth: {
        token: {
          accessTtl: env.AUTH_ACCESS_TOKEN_TTL,
          renewalThreshold: env.AUTH_TOKEN_RENEWAL_THRESHOLD,
          validityDuration: env.AUTH_TOKEN_VALIDITY_DURATION
        }
      },
      db: {
        url: env.DATABASE_URL,
        prefix: env.DATABASE_PREFIX,
        migrationsFolder: env.DATABASE_MIGRATIONS_FOLDER
      },
      environment: {
        isProduction: env.NODE_ENV === 'production',
        isStaging: env.NODE_ENV === 'staging',
        isDevelopment: env.NODE_ENV === 'development',
        isTesting: env.NODE_ENV === 'test'
      },
      mail: {
        url: env.MAIL_URL,
        sender: {
          name: env.MAIL_SENDER_NAME,
          email: env.MAIL_SENDER_EMAIL
        },
        support: {
          name: env.MAIL_SUPPORT_NAME,
          email: env.MAIL_SUPPORT_EMAIL
        }
      },
      server: {
        port: env.SERVER_PORT,
        url: env.SERVER_URL
      }
    }

    return yield* Schema.decodeUnknown(AppConfigSchema)(config)
  })
)
