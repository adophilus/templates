import { StorageRepository } from "../repository/interface";
import {
  StorageUploadError,
  StorageDatabaseError,
  StorageValidationError,
  StorageFileError
} from './error';
import { ulid } from "ulidx";
import type { MediaDescription } from "@/types";
import { Effect, Layer } from 'effect';
import { Storage } from './interface';
import { config } from "@/features/config";

// Validation utilities
const validateFile = (file: File): Effect.Effect<true, StorageValidationError> => 
  Effect.gen(function*(_) {
    if (!file.name) {
      yield* Effect.fail(new StorageValidationError({ message: "File name is required" }));
    }
    
    if (file.size === 0) {
      yield* Effect.fail(new StorageValidationError({ message: "File size cannot be zero" }));
    }
    
    // Check file size limit - using a reasonable default
    const maxFileSize = 10 * 1024 * 1024; // 10MB default
    if (file.size > maxFileSize) {
      yield* Effect.fail(new StorageValidationError({ 
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
              new StorageFileError({ 
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
              new StorageDatabaseError({ 
                message: `Database operation failed: ${String(error)}`,
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
        })
    });
  })
);

export const SqliteStorageLive = createSqliteStorage;
