import type { ColumnType } from 'kysely'

type Id = ColumnType<string, string, never>

type TimestampModel = {
  created_at: ColumnType<string, never, never>
  updated_at: ColumnType<string, never, string>
}

type TimestampWithDeletedAtModel = TimestampModel & {
  deleted_at: ColumnType<string | null, string | undefined, string | null>
}

export type Media = {
  public_id: string
  url: string
}

type AuthUsersTable = TimestampModel & {
  id: Id
  full_name: string
  email: string
  phone_number: string
  referral_code: string | null
  verified_at: string | null
  role: 'USER' | 'ADMIN' | 'CHEF'
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
