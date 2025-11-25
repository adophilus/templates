import type { ColumnType } from 'kysely'
import type { types } from '@nodejs-fullstack-template/api'

export type MediaDescription =
  types.components['schemas']['Api.MediaDescription']

type Id = ColumnType<string, string, never>

type TimestampModel = {
  created_at: ColumnType<number, never, never>
  updated_at: ColumnType<number, never, number>
}

type AuthUsersTable = TimestampModel & {
  id: Id
  full_name: string
  email: string
  verified_at: number | null
}

type AuthTokensTable = TimestampModel & {
  id: Id
  token: string
  purpose: string
  expires_at: number
  user_id: string
}

type StorageFilesTable = TimestampModel & {
  id: Id
  original_name: string
  file_data: Buffer
  mime_type: string
}

export type KyselyDatabaseTables = {
  auth_users: AuthUsersTable
  auth_tokens: AuthTokensTable
  storage_files: StorageFilesTable
}
