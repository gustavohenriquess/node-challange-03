import { describe, expect, it, beforeEach } from 'vitest'
import { InMemoryPetsComplementsRepository } from '@/repositories/in-memory/pets-complements-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/pets-repository'
import { SearchPetsUseCase } from './search-pets'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/orgs-repository'
import { randomUUID } from 'node:crypto'

let petsRepo: InMemoryPetsRepository
let petsComplementRepo: InMemoryPetsComplementsRepository
let orgsRepo: InMemoryOrgsRepository
let sut: SearchPetsUseCase

describe('Search Pets UseCase', () => {
  beforeEach(async () => {
    petsRepo = new InMemoryPetsRepository()
    petsComplementRepo = new InMemoryPetsComplementsRepository()
    orgsRepo = new InMemoryOrgsRepository()
    sut = new SearchPetsUseCase(petsRepo, petsComplementRepo)

    await orgsRepo.create({
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
      await petsRepo.create({
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
    }
  })

  it('should be able to search pets', async () => {
    const { pets } = await sut.execute({ city: 'São Paulo', page: 1 })

    expect(pets).toHaveLength(5)
  })

  it('should be able to search paginated pets', async () => {
    for (let i = 0; i < 25; i++) {
      await petsRepo.create({
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

    const { pets } = await sut.execute({ city: 'São Bernardo', page: 1 })

    expect(pets).toHaveLength(20)
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
