import { ulid } from "ulidx";
import type { MediaDescription } from "@/types";
import { Context, Effect, Layer } from 'effect';
import { Storage } from './interface';
import { StorageUploadError } from './error';

export const MockStorage: Context.Tag.Service<Storage> = {
  upload: (payload) =>
    Effect.gen(function*(_) {
      const id = ulid();

      // In a real implementation, you might want to store the file content somewhere
      // For the mock, we'll just generate a URL

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
    )
}

export const MockStorageLive = Layer.succeed(Storage, MockStorage);
