import 'reflect-metadata'

import { Container } from '@n8n/di'
import { HonoApp } from '@/features/app'
import {
  AuthTokenRepository,
  AuthUserRepository,
  KyselyAuthTokenRepository,
  KyselyAuthUserRepository
} from '@/features/auth/repository'
import { config } from '@/features/config'
import { KyselyClient } from '@/features/database/kysely'
import { createKyselyPgLiteClient } from '@/features/database/kysely/pglite'
import { Logger } from '@/features/logger'
import { Mailer, MockMailer } from '@/features/mailer'
import {
  OnboardingRepository,
  KyselyOnboardingRepository
} from '@/features/onboarding/repository'
import { SetUserPreferencesUseCase } from '@/features/onboarding/use-case'
import { MockStorageService, StorageService } from '@/features/storage/service'

export const bootstrap = async () => {
  // Logger
  const logger = new Logger({ name: 'App' })

  // Database
  const kyselyClient = await createKyselyPgLiteClient()

  // Storage DI
  const storageService = new MockStorageService()

  // Mailer DI
  const mailer = new MockMailer()

  // Auth DI
  const authUserRepository = new KyselyAuthUserRepository(kyselyClient, logger)
  const authTokenRepository = new KyselyAuthTokenRepository(
    kyselyClient,
    logger
  )

  // Onboarding DI
  const onboardingRepository = new KyselyOnboardingRepository(
    kyselyClient,
    logger
  )
  const setUserPreferencesUseCase = new SetUserPreferencesUseCase(
    onboardingRepository
  )

  const app = new HonoApp(logger)

  // Logger DI
  Container.set(Logger, logger)

  // Database DI
  Container.set(KyselyClient, kyselyClient)

  // Storage DI
  Container.set(StorageService, storageService)

  // Mailer DI
  Container.set(Mailer, mailer)

  // Auth DI
  Container.set(AuthUserRepository, authUserRepository)
  Container.set(AuthTokenRepository, authTokenRepository)

  // Onboarding DI
  Container.set(OnboardingRepository, onboardingRepository)
  Container.set(SetUserPreferencesUseCase, setUserPreferencesUseCase)

  return { app, logger, config }
}

const { app: appClass, logger } = await bootstrap()

const app = appClass.create()

export { app, logger }

