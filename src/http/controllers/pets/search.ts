import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeSearchPetUseCase } from '@/use-cases/factories/make-search-pet-use-case'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  console.log(request.query)

  const searchBodySchema = z.object({
    city: z.string(),
    page: z.coerce.number().min(1).default(1),
    age: z.number().int().optional(),
    energy: z.enum(['ONE', 'TWO', 'THREE', 'FOUR', 'FIVE']).optional(),
    size: z.enum(['SMALL', 'MEDIUM', 'LARGE']).optional(),
    independence: z.enum(['SMALL', 'MEDIUM', 'LARGE']).optional(),
    type: z
      .enum(['DOG', 'CAT', 'BIRD', 'FISH', 'REPTILE', 'RODENT', 'OTHER'])
      .optional(),
  })

  const { city, page, age, energy, independence, size, type } =
    searchBodySchema.parse(request.query)

  const searchUseCase = makeSearchPetUseCase()

  const pets = await searchUseCase.execute({
    city,
    page,
    age,
    energy,
    independence,
    size,
    type,
  })

  return reply.status(200).send(pets)
}
