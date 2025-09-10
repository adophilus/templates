import 'reflect-metadata'

import { Container } from '@n8n/di'
import { App, HonoApp } from '@/features/app'
import {
  AuthTokenRepository,
  AuthUserRepository,
  KyselyAuthTokenRepository,
  KyselyAuthUserRepository
} from '@/features/auth/repository'
import { config } from '@/features/config'
import { KyselyClient } from '@/features/database/kysely'
import { createKyselyPgClient } from '@/features/database/kysely/pg'
import { Logger } from '@/features/logger'
import { Mailer, NodemailerMailer } from '@/features/mailer'
import { OnboardingRepository, KyselyOnboardingRepository } from '@/features/onboarding/repository'
import { SetUserPreferencesUseCase } from '@/features/onboarding/use-case'
import { OpenTelemetryLogger } from '@/features/otel/logger'
import {
  OpenTelemetryService,
  OpenTelemetryServiceImplementation
} from '@/features/otel/service'
import {
  CloudinaryStorageService,
  StorageService
} from '@/features/storage/service'
import { SIGN_UP_VERIFICATION_TOKEN_PURPOSE_KEY } from '@/types'


export const bootstrap = async () => {
  // OpenTelemetry DI
  const openTelemetryService = new OpenTelemetryServiceImplementation()
  const openTelemetryLogger = new OpenTelemetryLogger(openTelemetryService, {
    name: 'App'
  })

  const logger = openTelemetryLogger

  // Database
  const kyselyClient = await createKyselyPgClient()

  // Storage DI
  const storageService = new CloudinaryStorageService(
    config.storage.mediaServerUrl
  )

  // Mailer DI
  const mailer = new NodemailerMailer(logger)

  // Auth DI
  const authUserRepository = new KyselyAuthUserRepository(kyselyClient, logger)
  const authTokenRepository = new KyselyAuthTokenRepository(
    kyselyClient,
    logger
  )

  // Onboarding DI
  const onboardingRepository = new KyselyOnboardingRepository(kyselyClient, logger)
  const setUserPreferencesUseCase = new SetUserPreferencesUseCase(onboardingRepository)

  const app = new HonoApp(logger)

  // App
  Container.set(App, app)

  // Database
  Container.set(KyselyClient, kyselyClient)

  // Storage DI
  Container.set(StorageService, storageService)

  // OpenTelemetry DI
  Container.set(OpenTelemetryService, openTelemetryService)
  Container.set(Logger, openTelemetryLogger)

  // Mailer DI
  Container.set(Mailer, mailer)

  // Auth DI
  Container.set(AuthUserRepository, authUserRepository)
  Container.set(AuthTokenRepository, authTokenRepository)

  // Onboarding DI
  Container.set(OnboardingRepository, onboardingRepository)
  Container.set(SetUserPreferencesUseCase, setUserPreferencesUseCase)

  return { app, logger, config, openTelemetryService }
}
