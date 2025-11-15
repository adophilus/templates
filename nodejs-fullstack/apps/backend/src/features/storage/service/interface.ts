import { Context, type Effect } from 'effect'
import type { MediaDescription } from "@/types";
import type { UploadFileError } from './error';

export class Storage extends Context.Tag('StorageService')<
  Storage,
  {
    upload: (payload: File) => Effect.Effect<MediaDescription, UploadFileError>
  }
>() { }
