import { PetComplement, Prisma } from '@prisma/client'
import { PetsComplementsRepository } from '../pets-complements-repository'
import { prisma } from '@/lib/prisma'

export class PrismaPetsComplementsRepository
  implements PetsComplementsRepository
{
  async create(
    data: Prisma.PetComplementUncheckedCreateInput,
  ): Promise<PetComplement> {
    return await prisma.petComplement.create({ data })
  }

  async findByPetId(id: string): Promise<PetComplement[] | null> {
    return await prisma.petComplement.findMany({ where: { pet: { id } } })
  }
}
