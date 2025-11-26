import { Context, type Effect, type Option } from 'effect'
import type { AuthToken } from '@/types'
import type { 
  AuthTokenServiceOperationError,
  AuthTokenServiceError,
  AuthTokenServiceNotFoundError 
} from './error'

export class AuthTokenService extends Context.Tag('AuthTokenService')<
  AuthTokenService,
  {
    create: (
      payload: AuthToken.Insertable
    ) => Effect.Effect<AuthToken.Selectable, AuthTokenServiceOperationError>
    
    findByUserIdAndPurpose: (
      payload: {
        user_id: string
        purpose: string
      }
    ) => Effect.Effect<Option.Option<AuthToken.Selectable>, AuthTokenServiceError>
    
    updateById: (
      id: string,
      payload: Omit<AuthToken.Updateable, 'id' | 'purpose' | 'user_id' | 'created_at' | 'updated_at'>
    ) => Effect.Effect<AuthToken.Selectable, AuthTokenServiceOperationError>
    
    findById: (
      id: string
    ) => Effect.Effect<Option.Option<AuthToken.Selectable>, AuthTokenServiceError>
    
    deleteById: (
      id: string
    ) => Effect.Effect<void, AuthTokenServiceError | AuthTokenServiceNotFoundError>
  }
>() { }

export type { AuthTokenServiceOperationError } from './error'