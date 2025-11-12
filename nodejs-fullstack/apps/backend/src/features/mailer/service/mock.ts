import type { Mailer } from './interface'
import { type Context, Effect } from 'effect'

export const MockMailer: Context.Tag.Service<Mailer> = {
  send: (_) => Effect.void
}
