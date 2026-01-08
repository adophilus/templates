import { Layer } from 'effect'
import { HttpLive } from './bootstrap'
import { AppConfigLive, EnvLive } from './features/config'

export const AppLive = HttpLive.pipe(
  Layer.provide(AppConfigLive),
  Layer.provide(EnvLive)
)
