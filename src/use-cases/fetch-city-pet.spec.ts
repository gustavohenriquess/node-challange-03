import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/orgs-repository'
import { InMemoryPetsComplementsRepository } from '@/repositories/in-memory/pets-complements-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/pets-repository'
import { FetchCityPetUseCase } from './fetch-city-pet'
import { randomUUID } from 'node:crypto'

let petRepo: InMemoryPetsRepository
let petComplementRepo: InMemoryPetsComplementsRepository
let orgRepo: InMemoryOrgsRepository
let sut: FetchCityPetUseCase

describe('Fetch Pet by City', () => {
  beforeEach(async () => {
    petRepo = new InMemoryPetsRepository()
    petComplementRepo = new InMemoryPetsComplementsRepository()
    orgRepo = new InMemoryOrgsRepository()
    sut = new FetchCityPetUseCase(petRepo, petComplementRepo, orgRepo)

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

    for (let i = 0; i < 5; i++) {
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

      await petComplementRepo.create({
        pet_id: petId,
        photo_url: 'url',
      })

      await petComplementRepo.create({
        pet_id: petId,
        requirement: 'requirement',
      })
    }
  })

  it('should fetch pets by city', async () => {
    for (let i = 0; i < 3; i++) {
      await petRepo.create({
        id: randomUUID(),
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
        city: 'São Bernardo',
      })
    }

    const { pets } = await sut.execute({ city: 'São Bernardo' })

    expect(pets).toHaveLength(3)
    expect(pets).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          city: 'São Bernardo',
        }),
      ]),
    )
  })
})
