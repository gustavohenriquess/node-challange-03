import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/pets-repository'
import { CreatePetUseCase } from './create-pet'
import { InMemoryPetsComplementsRepository } from '@/repositories/in-memory/pets-complements-repository'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/orgs-repository'

let petRepo: InMemoryPetsRepository
let petComplementRepo: InMemoryPetsComplementsRepository
let orgRepo: InMemoryOrgsRepository
let sut: CreatePetUseCase

describe('Create Pet', () => {
  beforeEach(async () => {
    petRepo = new InMemoryPetsRepository()
    petComplementRepo = new InMemoryPetsComplementsRepository()
    orgRepo = new InMemoryOrgsRepository()
    sut = new CreatePetUseCase(petRepo, petComplementRepo, orgRepo)

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

  it('should create a new pet', async () => {
    const { pet } = await sut.execute({
      name: 'Pet',
      about: 'About',
      age: 1,
      energy: 'FOUR',
      size: 'SMALL',
      independence: 'MEDIUM',
      sex: 'MALE',
      type: 'DOG',
      environment: 'MEDIUM',
      orgId: 'orgId',
    })

    expect(pet.id).toEqual(expect.any(String))
  })

  it('should create a new pet with complements', async () => {
    const { pet, complements } = await sut.execute({
      name: 'Pet',
      about: 'About',
      age: 1,
      energy: 'FOUR',
      size: 'SMALL',
      independence: 'MEDIUM',
      sex: 'MALE',
      type: 'DOG',
      environment: 'MEDIUM',
      orgId: 'orgId',
      complements: [{ requirement: 'requirement' }, { photo_url: 'photo_url' }],
    })

    expect(pet.id).toEqual(expect.any(String))
    expect(complements).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          requirement: 'requirement',
        }),
        expect.objectContaining({
          id: expect.any(String),
          photo_url: 'photo_url',
        }),
      ]),
    )
  })
})
