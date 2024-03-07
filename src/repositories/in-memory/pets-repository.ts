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

  async find(params: FindPetsArgs) {
    return this.pets.filter((pet) => {
      return (
        pet.city === params.city &&
        pet.age === params.age &&
        pet.energy === params.energy &&
        pet.size === params.size &&
        pet.independence === params.independence &&
        pet.sex === params.sex &&
        pet.type === params.type &&
        pet.environment === params.environment
      )
    })
  }

  async findById(id: string) {
    return this.pets.find((pet) => pet.id === id) ?? null
  }
}
