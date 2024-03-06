import { randomUUID } from 'node:crypto'
import { PetComplement, Prisma } from '@prisma/client'
import { PetsComplementsRepository } from '../pets-complements-repository'

export class InMemoryPetsComplementsRepository
  implements PetsComplementsRepository
{
  public petsComplements: PetComplement[] = []

  async create(data: Prisma.PetComplementUncheckedCreateInput) {
    const petComplement = {
      id: data.id ?? randomUUID(),
      photo_url: data.photo_url ?? null,
      requirement: data.requirement ?? null,
      created_at: new Date(),
      pet_id: data.pet_id,
    }
    this.petsComplements.push(petComplement)

    return petComplement
  }

  async findByPetId(id: string) {
    return this.petsComplements.filter((complement) => complement.pet_id === id)
  }
}
