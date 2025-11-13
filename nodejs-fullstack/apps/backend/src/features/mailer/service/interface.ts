import { Context, type Effect } from 'effect'
import type { SendMailError } from './error'

export class Mailer extends Context.Tag('MailerService')<
  Mailer,
  {
    send: (payload: {
      recipients: string[]
      subject: string
      email: JSX.Element
    }) => Effect.Effect<void, SendMailError>
  }
>() { }
