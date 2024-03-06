import { PetComplement, Prisma } from '@prisma/client'

export interface PetsComplementsRepository {
  create: (
    data: Prisma.PetComplementUncheckedCreateInput,
  ) => Promise<PetComplement>
  findByPetId: (id: string) => Promise<PetComplement[] | null>
}
