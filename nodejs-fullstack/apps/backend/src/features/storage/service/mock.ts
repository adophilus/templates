import { ulid } from "ulidx";
import type { MediaDescription, StorageFile } from "@/types";
import { Context, Effect, Layer, Option } from 'effect';
import { Storage } from './interface';
import { StorageUploadError } from './error';
import { StorageRepositoryError, StorageRepositoryNotFoundError } from '../repository/error';

export const MockStorage: Context.Tag.Service<Storage> = {
  upload: (payload) =>
    Effect.gen(function*(_) {
      const id = ulid();

      // For upload, we'll create a record and return MediaDescription
      return {
        id,
        source: "mock",
        url: `http://mock.url/${id}`,
      };
    }).pipe(
      Effect.catchAll((error) => 
        Effect.fail(new StorageUploadError({ 
          message: `Failed to upload file: ${String(error)}`,
          cause: error 
        }))
      )
    ),
  
  create: (payload) =>
    Effect.gen(function*(_) {
      const id = payload.id || ulid();
      
      return {
        id,
        source: "mock",
        url: `http://mock.url/${id}`,
      };
    }).pipe(
      Effect.catchAll((error) => 
        Effect.fail(new StorageUploadError({ 
          message: `Failed to create file: ${String(error)}`,
          cause: error 
        }))
      )
    ),
  
  createMany: (payloads) =>
    Effect.forEach(payloads, payload => 
      Effect.gen(function*(_) {
        const id = payload.id || ulid();
        
        return {
          id,
          source: "mock",
          url: `http://mock.url/${id}`,
        };
      })
    ).pipe(
      Effect.catchAll((error) => 
        Effect.fail(new StorageUploadError({ 
          message: `Failed to create multiple files: ${String(error)}`,
          cause: error 
        }))
      )
    ),
  
  findById: (id) =>
    Effect.gen(function*(_) {
      // For mock, we'll just return a mock media description if id exists
      const exists = id.length > 0; // simple check
      
      if (exists) {
        return Option.some({
          id,
          source: "mock",
          url: `http://mock.url/${id}`,
        });
      }
      
      return Option.none();
    }).pipe(
      Effect.catchAll((error) => 
        Effect.fail(new StorageRepositoryError({ 
          message: `Failed to find file by ID: ${String(error)}`,
          cause: error 
        }))
      )
    ),
  
  deleteById: (id) =>
    Effect.gen(function*(_) {
      // Mock deletion - just succeed
      return void 0;
    }).pipe(
      Effect.catchAll((error) => {
        // Check if the error is because the file doesn't exist
        // For mock purposes, we'll consider any error as NotFound
        return Effect.fail(new StorageRepositoryNotFoundError({ 
          message: `File with ID ${id} not found`,
          cause: error 
        }));
      })
    )
}

export const MockStorageLive = Layer.succeed(Storage, MockStorage);
