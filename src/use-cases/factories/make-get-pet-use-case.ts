import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { PrismaPetsComplementsRepository } from '@/repositories/prisma/prisma-pets-complements-repository'
import { GetPetUseCase } from '../get-pet'

export function makeGetPetUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const petsComplementsRepository = new PrismaPetsComplementsRepository()
  const uc = new GetPetUseCase(petsRepository, petsComplementsRepository)

  return uc
}
