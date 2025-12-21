import { Effect, Layer, Schema } from 'effect' // Removed Config import
import { AppConfig } from './interface'
import { AppConfigSchema } from './schema'
import { Env } from '../env' // Import EnvService

export const AppConfigLive = Layer.effect(
  AppConfig,
  Effect.gen(function* () {
    const env = yield* Env // Inject EnvService

    const expiry =
      env.NODE_ENV === 'production'
        ? 3600
        : env.NODE_ENV === 'staging'
          ? 3600
          : env.NODE_ENV === 'development'
            ? 3600
            : 1

    const config = {
      auth: {
        token: {
          secret: env.AUTH_TOKEN_SECRET,
          access: {
            expiry: 60
          },
          refresh: {
            expiry: 60 * 24 * 30
          },
          signup: {
            expiry: expiry
          },
          signin: {
            expiry: expiry
          }
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
