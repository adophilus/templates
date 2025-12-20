import { render, renderPlainText } from 'jsx-email'
import nodemailer from 'nodemailer'
import { Context, Effect, Layer } from 'effect'
import { Mailer } from './interface'
import {
  MailerRenderingError,
  MailerTransportError,
  MailerValidationError
} from './error'
import type { SendMailError } from './error'
import { AppConfig } from '@/features/config'

type EmailPayload = {
  readonly recipients: readonly string[]
  readonly subject: string
  readonly email: JSX.Element
}

type MailOptions = {
  from: string
  to: string
  subject: string
  text: string
  html: string
}

const validateEmail = (
  email: string
): Effect.Effect<true, MailerValidationError> =>
  Effect.succeed(email.includes('@') && email.includes('.')).pipe(
    Effect.flatMap((valid) =>
      valid
        ? Effect.succeed(true as const)
        : Effect.fail(
            new MailerValidationError({
              message: `Invalid email address: ${email}`
            })
          )
    )
  )

const validateRecipients = (
  recipients: readonly string[]
): Effect.Effect<readonly string[], MailerValidationError> =>
  Effect.forEach(recipients, validateEmail).pipe(Effect.as(recipients))

export class NodemailerTransporter extends Context.Tag('NodemailerTransporter')<
  NodemailerTransporter,
  {
    readonly sendMail: (
      options: MailOptions
    ) => Effect.Effect<void, MailerTransportError>
  }
>() {}

const createTransporter = Effect.gen(function* () {
  const config = yield* AppConfig

  const transporter = nodemailer.createTransport({
    url: config.mail.url,
    headers: { 'Content-Transfer-Encoding': 'quoted-printable' }
  })

  transporter.on('error', (err) => {
    console.error('Nodemailer transporter error:', err)
  })

  return {
    sendMail: (options: MailOptions) =>
      Effect.tryPromise({
        try: () => transporter.sendMail(options),
        catch: (error) =>
          new MailerTransportError({
            message: `Transporter failed to send email: ${String(error)}`,
            cause: error
          })
      })
  }
})

export const NodemailerMailer = Layer.effect(
  Mailer,
  Effect.gen(function* () {
    const config = yield* AppConfig
    const transporter = yield* createTransporter

    return Mailer.of({
      send: (payload: EmailPayload) =>
        Effect.gen(function* () {
          yield* validateRecipients(payload.recipients).pipe(
            Effect.mapError((error) => error as SendMailError)
          )

          const recipients = payload.recipients.join(', ')

          const [plainText, htmlText] = yield* Effect.all(
            [
              Effect.tryPromise({
                try: () => renderPlainText(payload.email),
                catch: (error) =>
                  new MailerRenderingError({
                    message: `Failed to render plain text: ${String(error)}`,
                    cause: error
                  })
              }),
              Effect.tryPromise({
                try: () => render(payload.email),
                catch: (error) =>
                  new MailerRenderingError({
                    message: `Failed to render HTML: ${String(error)}`,
                    cause: error
                  })
              })
            ],
            { concurrency: 2 }
          ).pipe(Effect.mapError((error) => error as SendMailError))

          yield* transporter
            .sendMail({
              from: `"${config.mail.sender.name}" <${config.mail.sender.email}>`,
              to: recipients,
              subject: payload.subject,
              text: plainText,
              html: htmlText
            })
            .pipe(Effect.mapError((error) => error as SendMailError))
        })
    })
  })
)

export const NodemailerMailerLive = NodemailerMailer
