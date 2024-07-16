import { randomUUID } from 'node:crypto'
import { FindPetsArgs, PetsRepository } from '../pets-repository'
import { Pet, Prisma } from '@prisma/client'

export class InMemoryPetsRepository implements PetsRepository {
  public pets: Pet[] = []
  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = {
      id: data.id ?? randomUUID(),
      ...data,
      created_at: new Date(),
    }
    this.pets.push(pet)

    return pet
  }

  async find(
    {
      city,
      age,
      energy,
      size,
      independence,
      sex,
      type,
      environment,
    }: FindPetsArgs,
    page: number,
  ): Promise<Pet[]> {
    return this.pets
      .filter((pet) => pet.city === city)
      .filter((pet) => (age ? pet.age === age : true))
      .filter((pet) => (energy ? pet.energy === energy : true))
      .filter((pet) => (size ? pet.size === size : true))
      .filter((pet) =>
        independence ? pet.independence === independence : true,
      )
      .filter((pet) => (sex ? pet.sex === sex : true))
      .filter((pet) => (type ? pet.type === type : true))
      .filter((pet) => (environment ? pet.environment === environment : true))
      .slice((page - 1) * 20, page * 20)
  }

  async findById(id: string): Promise<Pet | null> {
    return this.pets.find((pet) => pet.id === id) ?? null
  }
}
