import { Context } from 'effect'
import type { AppConfigSchema } from './schema' // Corrected import name

export class AppConfig extends Context.Tag('AppConfig')<
  AppConfig,
  AppConfigSchema
>() {}
