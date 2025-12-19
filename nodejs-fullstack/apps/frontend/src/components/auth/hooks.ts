import { Either, Schema } from 'effect'
import {
  useAtomValue,
  Atom,
  useAtomSet,
} from '@effect-atom/atom-react'

class AuthenticatedAuthStoreSchema extends Schema.Class<AuthenticatedAuthStoreSchema>(
  'AuthenticatedAuthStoreSchema'
)({
  status: Schema.Literal('authenticated'),
  token: Schema.String
}) { }

class UnauthenticatedAuthStoreSchema extends Schema.Class<UnauthenticatedAuthStoreSchema>(
  'UnauthenticatedAuthStoreSchema'
)({
  status: Schema.Literal('unauthenticated')
}) { }

class AuthStoreSchema extends Schema.Union(
  AuthenticatedAuthStoreSchema,
  UnauthenticatedAuthStoreSchema
) { }

const LOCAL_STORAGE_KEY = 'AUTH_STORE'

const getInitalAuthStore = (): typeof AuthStoreSchema.Type => {
  const persistedAuthStoreString =
    window.localStorage.getItem(LOCAL_STORAGE_KEY) ??
    '{"status":"unauthenticated"}'

  let json: unknown
  try {
    json = JSON.parse(persistedAuthStoreString)
  } catch {
    json = { status: 'unauthenticated' }
  }

  const res = Schema.decodeUnknownEither(AuthStoreSchema)(json).pipe(
    Either.match({
      onLeft: () =>
        new UnauthenticatedAuthStoreSchema({ status: 'unauthenticated' }),
      onRight: (val) => val
    })
  )

  return res
}

export const authAtom = Atom.writable(
  () => getInitalAuthStore(),
  (ctx, payload: typeof AuthStoreSchema.Type) => {
    ctx.setSelf(payload)
    persistAuth(payload)
  }
)

export const useAuth = () => useAtomValue(authAtom)
export const useSetAuth = () => useAtomSet(authAtom)
const persistAuth = (value: typeof AuthStoreSchema.Type) => {
  window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(value))
}
