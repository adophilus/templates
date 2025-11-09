import { bootstrap } from '@nodejs-fullstack-template/backend'
import { serve } from '@hono/node-server'

const { app, logger, config } = await bootstrap()

serve(
  {
    fetch: app.create().fetch,
    port: config.server.port
  },
  (info) => {
    logger.info(`Server is running on http://${info.address}:${info.port}`)
  }
)
