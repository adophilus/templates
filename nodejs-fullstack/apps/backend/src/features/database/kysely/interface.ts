import type { Kysely } from 'kysely'
import type { KyselyDatabaseTables } from './tables'
import { Context } from 'effect'

export class KyselyClient extends Context.Tag('KyselyClient')<
  KyselyClient,
  Kysely<KyselyDatabaseTables>
>() {}
