import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/pets-repository'
import { InMemoryPetsComplementsRepository } from '@/repositories/in-memory/pets-complements-repository'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/orgs-repository'
import { GetPetUseCase } from './get-pet'
import { randomUUID } from 'node:crypto'
import { ResourceNotFoundError } from './errors/resource-not-found'
import { makeOrg } from 'test/factories/make-org.factories'
import { makePet } from 'test/factories/make-pet.factories'

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

    const org = makeOrg({ id: 'orgId' })
    await orgRepo.create({ ...org, password_hash: org.password })
  })

  it('should be able to return a pet', async () => {
    const pet = makePet({ orgId: 'orgId' })
    await petRepo.create(pet)

    const response = await sut.execute({ id: pet.id })
    expect(response.id).toEqual(pet.id)
    expect(response.complements).toEqual([])
  })
  it('should not be able to return a uncreated pet', async () => {
    await expect(async () => {
      await sut.execute({ id: randomUUID() })
    }).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
