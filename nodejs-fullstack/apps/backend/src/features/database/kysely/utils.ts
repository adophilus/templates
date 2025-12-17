import { config } from '@/features/config'
import { IndexPrefixPlugin, TablePrefixPlugin } from 'kysely-plugin-prefix'

export const getKyselyPlugins = () => [
  new TablePrefixPlugin({ prefix: config.db.prefix ?? '' }),
  new IndexPrefixPlugin({ prefix: config.db.prefix ?? '' })
]
