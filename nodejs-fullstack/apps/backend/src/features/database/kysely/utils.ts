import { config } from '@/features/config'
import { IndexPrefixPlugin, TablePrefixPlugin } from 'kysely-plugin-prefix'
// import { SerializePlugin } from 'kysely-plugin-serialize'

export const getKyselyPlugins = () => [
  // new SerializePlugin(),
  new TablePrefixPlugin({ prefix: config.db.prefix ?? '' }),
  new IndexPrefixPlugin({ prefix: config.db.prefix ?? '' })
]
