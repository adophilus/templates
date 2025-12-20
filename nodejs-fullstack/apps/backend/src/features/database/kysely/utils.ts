import { IndexPrefixPlugin, TablePrefixPlugin } from 'kysely-plugin-prefix'

export const getKyselyPlugins = (prefix?: string) => [
  new TablePrefixPlugin({ prefix: prefix ?? '' }),
  new IndexPrefixPlugin({ prefix: prefix ?? '' })
]
