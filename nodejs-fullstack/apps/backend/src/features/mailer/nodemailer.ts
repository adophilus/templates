import { render, renderPlainText } from 'jsx-email'
import nodemailer from 'nodemailer'
import { config } from '../config'
import { type Context, Effect, Cache, Duration } from 'effect'
import type { Mailer } from './interface'
import { MailerError } from './error'

const TRANSPORTER_KEY = 'TRANSPORTER'
type TRANSPORTER_KEY = typeof TRANSPORTER_KEY

// TODO: should probably use an effect scope or something for this resource
const getTransporter = (key: TRANSPORTER_KEY) =>
  Effect.sync(() => {
    const transporter = nodemailer.createTransport({
      url: config.mail.url,
      headers: { 'Content-Transfer-Encoding': 'quoted-printable' }
    })

    transporter.on('error', (err) => {
      console.log('Nodemailer transporter error:', err)
    })

    return transporter
  })

export const NodemailerMailer: Context.Tag.Service<Mailer> = {
  send: (payload) =>
    Effect.gen(function*(_) {
      const recipients = payload.recipients.join(', ')
      const plainText = yield* Effect.tryPromise({
        try: () => renderPlainText(payload.email),
        catch: () => new MailerError()
      })
      const htmlText = yield* Effect.tryPromise({
        try: () => render(payload.email),
        catch: () => new MailerError()
      })

      const cache = yield* Cache.make({
        capacity: 1,
        timeToLive: Duration.infinity,
        lookup: getTransporter
      })

      const transporter = yield* cache.get(TRANSPORTER_KEY)

      yield* Effect.tryPromise({
        try: () =>
          transporter.sendMail({
            from: `"${config.mail.sender.name}" <${config.mail.sender.email}>`,
            to: recipients,
            subject: payload.subject,
            text: plainText,
            html: htmlText
          }),
        catch: () => new MailerError()
      })
    })
}
