import { Effect, Layer } from 'effect'
import { AuthTokenRepository } from '../../repository/token/interface'
import {
  AuthTokenServiceError,
  AuthTokenServiceNotFoundError,
  AuthTokenServiceValidationError,
  AuthTokenServiceConstraintError
} from './error'
import { AuthTokenService } from './interface'
import {
  AuthTokenRepositoryError,
  AuthTokenRepositoryNotFoundError,
  AuthTokenRepositoryConstraintError,
  AuthTokenRepositoryValidationError
} from '../../repository/token/error'
import type { AuthToken } from '@/types'

export const SqliteAuthTokenServiceLive = Layer.effect(
  AuthTokenService,
  Effect.gen(function*(_) {
    const repository = yield* AuthTokenRepository

    return AuthTokenService.of({
      create: (payload) =>
        repository.create(payload).pipe(
          Effect.mapError((error) => {
            // Map repository errors to service errors
            if (error instanceof AuthTokenRepositoryConstraintError) {
              return new AuthTokenServiceConstraintError({
                message: `Constraint violation: ${error.message}`,
                cause: error
              })
            }
            if (error instanceof AuthTokenRepositoryValidationError) {
              return new AuthTokenServiceValidationError({
                message: `Validation error: ${error.message}`,
                cause: error
              })
            }
            return new AuthTokenServiceError({
              message: `Failed to create token: ${error.message}`,
              cause: error
            })
          })
        ),

      findByUserIdAndPurpose: (payload) =>
        repository.findByUserIdAndPurpose(payload).pipe(
          Effect.mapError((error) =>
            new AuthTokenServiceError({
              message: `Failed to find token by user and purpose: ${error.message}`,
              cause: error
            })
          )
        ),

      updateById: (id, payload) =>
        repository.updateById(id, payload).pipe(
          Effect.mapError((error) => {
            if (error instanceof AuthTokenRepositoryConstraintError) {
              return new AuthTokenServiceConstraintError({
                message: `Constraint violation: ${error.message}`,
                cause: error
              })
            }
            if (error instanceof AuthTokenRepositoryValidationError) {
              return new AuthTokenServiceValidationError({
                message: `Validation error: ${error.message}`,
                cause: error
              })
            }
            return new AuthTokenServiceError({
              message: `Failed to update token: ${error.message}`,
              cause: error
            })
          })
        ),

      findById: (id) =>
        repository.findById(id).pipe(
          Effect.mapError((error) =>
            new AuthTokenServiceError({
              message: `Failed to find token by ID: ${error.message}`,
              cause: error
            })
          )
        ),

      deleteById: (id) =>
        repository.deleteById(id).pipe(
          Effect.mapError((error) => {
            if (error instanceof AuthTokenRepositoryNotFoundError) {
              return new AuthTokenServiceNotFoundError({
                message: `Token with ID ${id} not found`,
                cause: error
              })
            }
            return new AuthTokenServiceError({
              message: `Failed to delete token: ${error.message}`,
              cause: error
            })
          })
        )
    })
  })
)