import { randomUUID } from 'node:crypto'
import { FindPetsArgs, PetsRepository } from '../pets-repository'
import { Pet, Prisma } from '@prisma/client'

export class InMemoryPetsRepository implements PetsRepository {
  public pets: Pet[] = []
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: data.id ?? randomUUID(),
      name: data.name,
      about: data.about,
      age: data.age,
      city: data.city,
      energy: data.energy,
      size: data.size,
      independence: data.independence,
      sex: data.sex,
      type: data.type,
      environment: data.environment,
      created_at: new Date(),
      org_id: data.org_id,
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
  ) {
    return this.pets
      .filter((pet) => {
        return (
          pet.city === city ||
          pet.age === age ||
          pet.energy === energy ||
          pet.size === size ||
          pet.independence === independence ||
          pet.sex === sex ||
          pet.type === type ||
          pet.environment === environment
        )
      })
      .slice((page - 1) * 20, page * 20)
  }

  async findById(id: string) {
    return this.pets.find((pet) => pet.id === id) ?? null
  }
}
