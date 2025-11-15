import { createRawSqliteKyselyClient } from '@/features/database/kysely/db/sqlite'

const client = await createRawSqliteKyselyClient()

export default client
