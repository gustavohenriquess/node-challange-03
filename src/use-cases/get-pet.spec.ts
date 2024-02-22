import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/pets-repository'
import { InMemoryPetsComplementsRepository } from '@/repositories/in-memory/pets-complements-repository'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/orgs-repository'
import { GetPetUseCase } from './get-pet'
import { randomUUID } from 'node:crypto'

let petRepo: InMemoryPetsRepository
let petComplementRepo: InMemoryPetsComplementsRepository
let orgRepo: InMemoryOrgsRepository
let sut: GetPetUseCase

describe('Get Pet UseCase', async () => {
  beforeEach(async () => {
    petRepo = new InMemoryPetsRepository()
    petComplementRepo = new InMemoryPetsComplementsRepository()
    orgRepo = new InMemoryOrgsRepository()
    sut = new GetPetUseCase(petRepo, petComplementRepo)

    await orgRepo.create({
      id: 'orgId',
      name: 'Org',
      email: 'email@email.com',
      person_responsible: 'Person',
      postal_code: '123',
      cell_phone: '123',
      password_hash: '123',
      state: 'São Paulo',
      city: 'SP',
    })
  })

  it('should return a pet', async () => {
    const petId = randomUUID()
    await petRepo.create({
      id: petId,
      name: 'Pet',
      about: 'About',
      age: 1,
      energy: 'FOUR',
      size: 'SMALL',
      independence: 'MEDIUM',
      sex: 'MALE',
      type: 'DOG',
      environment: 'MEDIUM',
      org_id: 'orgId',
      city: 'São Paulo',
    })

    const { pet, complements } = await sut.execute({ id: petId })

    expect(pet.id).toEqual(petId)
    expect(complements).toEqual([])
  })
})
