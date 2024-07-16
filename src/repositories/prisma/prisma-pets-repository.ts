import { FindPetsArgs, PetsRepository } from '../pets-repository'
import { Pet, Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    return await prisma.pet.create({ data })
  }

  async find(params: FindPetsArgs, page: number): Promise<Pet[] | null> {
    return await prisma.pet.findMany({
      where: {
        city: params.city,
        age: params.age,
        energy: params.energy,
        size: params.size,
        independence: params.independence,
        sex: params.sex,
        type: params.type,
        environment: params.environment,
      },
      skip: (page - 1) * 20,
      take: page * 20,
    })
  }

  async findById(id: string): Promise<Pet | null> {
    return await prisma.pet.findUnique({
      where: {
        id,
      },
    })
  }
}
