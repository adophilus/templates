import { Hono } from 'hono'
import { compress } from 'hono/compress'
import { cors } from 'hono/cors'
import { logger as honoLogger } from 'hono/logger'
import { StatusCodes } from '@/features/http'
import type { Logger } from '@/features/logger'
import OnboardingRouter from '@/features/onboarding/route'
import type App from './interface'

class HonoApp implements App {
  constructor(private logger: Logger) {}

  create() {
    const ApiRouter = new Hono()
      .route('/onboarding', OnboardingRouter)

    return (
      new Hono()
        // .use('*', otel())
        .use(compress())
        .use(cors())
        .use(honoLogger())
        .route('/', ApiRouter)
        .get('/', (c) => c.json({ message: 'Welcome to Grovine API' }))
        .notFound((c) => c.json({ error: 'NOT_FOUND' }, StatusCodes.NOT_FOUND))
        .onError((err, c) => {
          this.logger.error('An unexpected error occurred:', err)
          return c.json(
            { code: 'ERR_UNEXPECTED' },
            StatusCodes.INTERNAL_SERVER_ERROR
          )
        })
    )
  }
}

export default HonoApp