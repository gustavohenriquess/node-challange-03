import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeGetPetUseCase } from '@/use-cases/factories/make-get-pet-use-case'

export async function get(request: FastifyRequest, reply: FastifyReply) {
  const schema = z.object({
    id: z.string(),
  })

  const { id } = schema.parse(request.params)

  const getUseCase = makeGetPetUseCase()

  const pet = await getUseCase.execute({
    id,
  })

  return reply.status(200).send(pet)
}
