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
import { Logger } from '@/features/logger'
import { Mailer, NodemailerMailer } from '@/features/mailer'
import { Storage, SqliteStorageService } from '@/features/storage/service'
import {
  StorageRepository,
  KyselyStorageRepository
} from '@/features/storage/repository'
import { createKyselySqliteClient } from './features/database/kysely/sqlite'

export const bootstrap = async () => {
  const logger = new Logger()

  // Database
  const kyselyClient = await createKyselySqliteClient()

  // Storage DI
  const storageRepository = new KyselyStorageRepository(kyselyClient, logger)
  const storageService = new SqliteStorageService(storageRepository)

  // Mailer DI
  const mailer = new NodemailerMailer(logger)

  // Auth DI
  const authUserRepository = new KyselyAuthUserRepository(kyselyClient, logger)
  const authTokenRepository = new KyselyAuthTokenRepository(
    kyselyClient,
    logger
  )

  const app = new HonoApp(logger)

  // App
  Container.set(App, app)

  // Database
  Container.set(KyselyClient, kyselyClient)

  // Storage DI
  Container.set(StorageRepository, storageRepository)
  Container.set(Storage, storageService)

  // Mailer DI
  Container.set(Mailer, mailer)

  // Auth DI
  Container.set(AuthUserRepository, authUserRepository)
  Container.set(AuthTokenRepository, authTokenRepository)

  return { app, logger, config }
}
