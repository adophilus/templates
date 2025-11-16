import { createRawSqliteKyselyClient } from '@/features/database/kysely/db/sqlite'
import { defineConfig } from 'kysely-ctl'

const client = await createRawSqliteKyselyClient()

export default defineConfig({
  kysely: client
})
