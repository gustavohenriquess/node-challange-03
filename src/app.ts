import Fastify from 'fastify'
import { env } from '@/env'
import { ZodError } from 'zod'

export const app = Fastify({
  logger: env.NODE_ENV !== 'production',
})

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error',
      issues: error.format(),
    })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // Should be logged to a error tracking service
    // DataDog, Sentry, etc
  }

  return reply.status(500).send({ message: 'Internal server error' })
})
