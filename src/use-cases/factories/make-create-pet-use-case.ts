import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { PrismaPetsComplementsRepository } from '@/repositories/prisma/prisma-pets-complements-repository'
import { CreatePetUseCase } from '../create-pet'

export function makeCreatePetUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const petsComplementsRepository = new PrismaPetsComplementsRepository()
  const orgRepository = new PrismaOrgsRepository()
  const uc = new CreatePetUseCase(
    petsRepository,
    petsComplementsRepository,
    orgRepository,
  )

  return uc
}
