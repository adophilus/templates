import { type Kysely, sql } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('auth_sessions')
    .addColumn('id', 'text', (col) => col.primaryKey().notNull())
    .addColumn('expires_at', 'integer')
    .addColumn('user_id', 'text', (col) => col.notNull())
    .addColumn('created_at', 'integer', (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull()
    )
    .addColumn('updated_at', 'integer')
    .execute()
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('auth_sessions').execute()
}
