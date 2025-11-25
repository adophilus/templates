import { env } from '../env'

const DatabaseConfig = {
  url: env.DATABASE_URL,
  prefix: env.DATABASE_PREFIX,
  migrationsFolder: env.DATABASE_MIGRATIONS_FOLDER
}

export default DatabaseConfig
