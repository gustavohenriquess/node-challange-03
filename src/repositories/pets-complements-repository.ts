import { PetComplement, Prisma } from '@prisma/client'

export interface PetsComplementsRepository {
  create: (
    data: Prisma.PetComplementUncheckedCreateInput,
  ) => Promise<PetComplement>
  findById: (id: string) => Promise<PetComplement | null>
}
