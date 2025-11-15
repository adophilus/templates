import { StorageRepository } from "../repository/interface";
import { StorageRepositoryError, StorageRepositoryNotFoundError } from "../repository/error";
import {
  StorageServiceUploadError,
  StorageServiceError,
  StorageServiceValidationError,
  StorageServiceNotFoundError
} from './error';
import { ulid } from "ulidx";
import { Effect, Layer, Option } from 'effect';
import { Storage } from './interface';
import { config } from "@/features/config";

// Validation utilities
const validateFile = (file: File): Effect.Effect<true, StorageServiceValidationError> => 
  Effect.gen(function*(_) {
    if (!file.name) {
      yield* Effect.fail(new StorageServiceValidationError({ message: "File name is required" }));
    }
    
    if (file.size === 0) {
      yield* Effect.fail(new StorageServiceValidationError({ message: "File size cannot be zero" }));
    }
    
    // Check file size limit - using a reasonable default
    const maxFileSize = 10 * 1024 * 1024; // 10MB default
    if (file.size > maxFileSize) {
      yield* Effect.fail(new StorageServiceValidationError({ 
        message: `File size exceeds maximum allowed size: ${maxFileSize} bytes` 
      }));
    }
    
    return true as const;
  });

export const createSqliteStorage = Layer.effect(
  Storage,
  Effect.gen(function*(_) {
    const repository = yield* StorageRepository;
    
    return Storage.of({
      upload: (payload) =>
        Effect.gen(function*(_) {
          // Validate the file first
          yield* validateFile(payload);

          // Convert file to buffer
          const fileBuffer = yield* Effect.tryPromise({
            try: () => payload.arrayBuffer(),
            catch: (error) => 
              new StorageServiceUploadError({ 
                message: `Failed to read file buffer: ${String(error)}`,
                cause: error
              })
          });

          // Create the file record in the database using the repository from context
          const uploadedFile = yield* repository.create({
            id: ulid(),
            mime_type: payload.type,
            original_name: payload.name,
            file_data: Buffer.from(fileBuffer),
          }).pipe(
            Effect.mapError((error) => 
              new StorageServiceUploadError({ 
                message: `Upload operation failed: ${String(error)}`,
                cause: error
              })
            )
          );

          const id = uploadedFile.id;

          return {
            id,
            source: "cloud",
            url: `${config.server.url}/storage/${id}`,
          };
        }),
      
      
      
      get: (id) =>
        Effect.gen(function*(_) {
          const result = yield* repository.findById(id);
          
          // Transform StorageFile to MediaDescription within the Option
          const mappedResult = Option.map(
            result, 
            (file) => ({
              id: file.id,
              source: "cloud",
              url: `${config.server.url}/storage/${file.id}`,
            })
          );
          
          return mappedResult;
        }).pipe(
          Effect.mapError((error) => 
            new StorageServiceError({ 
              message: `Database operation failed: ${String(error)}`,
              cause: error
            })
          )
        ),
      
      delete: (id) =>
        Effect.gen(function*(_) {
          yield* repository.deleteById(id);
        }).pipe(
          Effect.mapError((error) => {
            if (error instanceof StorageRepositoryNotFoundError) {
              return new StorageServiceNotFoundError({ 
                message: `File with ID ${id} not found`,
                cause: error
              });
            }
            return new StorageServiceError({ 
              message: `Database operation failed: ${String(error)}`,
              cause: error
            });
          })
        )
    });
  })
);

export const SqliteStorageLive = createSqliteStorage;
