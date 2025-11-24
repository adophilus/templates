import type { ColumnType } from 'kysely'
import type { types } from '@nodejs-fullstack-template/api'

export type MediaDescription =
  types.components['schemas']['Api.MediaDescription']

type Id = ColumnType<string, string, never>

type TimestampModel = {
  created_at: ColumnType<string, never, never>
  updated_at: ColumnType<string, never, string>
}

type AuthUsersTable = TimestampModel & {
  id: Id
  full_name: string
  email: string
  verified_at: string | null
}

type AuthTokensTable = TimestampModel & {
  id: Id
  token: string
  purpose: string
  expires_at: string
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
