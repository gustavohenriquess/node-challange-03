import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeCreateOrgUseCase } from '@/use-cases/factories/make-create-org-use-case'
import { OrgAlreadyExistsError } from '@/use-cases/errors/org-already-exists-error'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    cell_phone: z.string().min(11),
    person_responsible: z.string().optional(),
    postal_code: z.string(),
  })

  const { name, email, password, cell_phone, person_responsible, postal_code } =
    registerBodySchema.parse(request.body)
  try {
    const registerUseCase = makeCreateOrgUseCase()
    await registerUseCase.execute({
      name,
      email,
      password,
      cell_phone,
      person_responsible,
      postal_code,
    })
  } catch (err) {
    if (err instanceof OrgAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
  return reply.status(201).send()
}
