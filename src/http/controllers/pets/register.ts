import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeCreatePetUseCase } from '@/use-cases/factories/make-create-pet-use-case'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const complementsObject = z.object({
    photo_url: z.string().optional(),
    requirement: z.string().optional(),
  })

  const registerBodySchema = z.object({
    name: z.string(),
    about: z.string(),
    age: z.number(),
    energy: z.enum(['ONE', 'TWO', 'THREE', 'FOUR', 'FIVE']),
    size: z.enum(['SMALL', 'MEDIUM', 'LARGE']),
    independence: z.enum(['SMALL', 'MEDIUM', 'LARGE']),
    sex: z.enum(['MALE', 'FEMALE']),
    type: z.enum(['DOG', 'CAT', 'BIRD', 'FISH', 'REPTILE', 'RODENT', 'OTHER']),
    environment: z.enum(['SMALL', 'MEDIUM', 'LARGE']),
    complements: z.array(complementsObject).optional(),
  })

  const {
    name,
    about,
    age,
    energy,
    environment,
    independence,
    sex,
    size,
    type,
    complements,
  } = registerBodySchema.parse(request.body)
  const { sub: orgId } = request.user

  const registerUseCase = makeCreatePetUseCase()

  await registerUseCase.execute({
    name,
    about,
    age,
    energy,
    environment,
    independence,
    orgId,
    sex,
    size,
    type,
    complements,
  })

  return reply.status(201).send()
}
