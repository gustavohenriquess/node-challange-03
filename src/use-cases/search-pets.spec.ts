import { describe, expect, it, beforeEach } from 'vitest'
import { InMemoryPetsComplementsRepository } from '@/repositories/in-memory/pets-complements-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/pets-repository'
import { SearchPetsUseCase } from './search-pets'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/orgs-repository'
import { makeOrg } from 'test/factories/make-org.factories'
import { makePet } from 'test/factories/make-pet.factories'

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

    const org = makeOrg({ id: 'orgId' })
    await orgsRepo.create({ ...org, password_hash: org.password })

    for (let i = 0; i < 5; i++) {
      await petsRepo.create(makePet({ orgId: 'orgId', city: 'São Paulo' }))
    }
  })

  it('should be able to search pets', async () => {
    const { pets } = await sut.execute({ city: 'São Paulo', page: 1 })

    expect(pets).toHaveLength(5)
  })

  it('should be able to search paginated pets', async () => {
    for (let i = 0; i < 25; i++) {
      await petsRepo.create(makePet({ orgId: 'orgId', city: 'São Bernardo' }))
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
