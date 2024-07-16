import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { PrismaPetsComplementsRepository } from '@/repositories/prisma/prisma-pets-complements-repository'
import { SearchPetsUseCase } from '../search-pets'

export function makeSearchPetUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const petsComplementsRepository = new PrismaPetsComplementsRepository()
  const uc = new SearchPetsUseCase(petsRepository, petsComplementsRepository)

  return uc
}
