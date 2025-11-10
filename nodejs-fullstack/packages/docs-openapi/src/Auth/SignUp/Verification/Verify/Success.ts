import { Schema } from 'effect'
import Jwt from '@api-docs/common/Jwt'

const Success = Schema.Struct({
  code: Schema.Literal('AUTH_CREDENTIALS'),
  data: Schema.Struct({
    access_token: Jwt,
    refresh_token: Jwt
  })
})

export default Success
