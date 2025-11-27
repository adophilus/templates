import AuthenticationMiddleware from '@nodejs-fullstack-template/docs-openapi/Auth/AuthenticationMiddleware'
import User from '@nodejs-fullstack-template/docs-openapi/common/User'
import { Effect, Layer } from 'effect'

export const AuthenticationMiddlewareLive = Layer.effect(
  AuthenticationMiddleware,
  Effect.gen(function* () {
    return AuthenticationMiddleware.of({
      token: (t) =>
        Effect.sync(() => {
          console.log(t)

          return User.make({
            id: '123',
            full_name: 'Mary Slessor',
            email: 'mary.slessor@mail.com',
            created_at: Math.round(Date.now() / 1000),
            updated_at: null
          })
        })
    })
  })
)
