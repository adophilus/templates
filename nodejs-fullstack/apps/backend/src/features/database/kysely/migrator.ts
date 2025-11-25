import { promises as fs } from 'node:fs'
import * as path from 'node:path'
import { FileMigrationProvider, Migrator } from 'kysely'
import type { Kysely } from 'kysely'
import type { KyselyDatabaseTables } from './tables'

export const createKyselyMigrator = (
  client: Kysely<KyselyDatabaseTables>,
  folder: string
): Migrator =>
  new Migrator({
    db: client,
    provider: new FileMigrationProvider({
      fs,
      path,
      migrationFolder: new URL(
        path.join(process.cwd(), folder),
        import.meta.url
      ).pathname
    })
  })

export default Migrator
