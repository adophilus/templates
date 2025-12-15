import { Schema } from 'effect'
import { Email } from '@nodejs-fullstack-template/api/common/index'

export const signInSchema = Schema.Struct({
  email: Email
})

export type SignInSchema = typeof signInSchema.Type

export const signUpSchema = Schema.Struct({
  email: Email,
  full_name: Schema.String.pipe(Schema.minLength(1))
})

export type SignUpSchema = typeof signUpSchema.Type
