import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/pets-repository'
import { CreatePetUseCase } from './create-pet'
import { InMemoryPetsComplementsRepository } from '@/repositories/in-memory/pets-complements-repository'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/orgs-repository'
import { ResourceNotFoundError } from './errors/resource-not-found'
import { makeOrg } from 'test/factories/make-org.factories'
import { makePet } from 'test/factories/make-pet.factories'

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
    const org = makeOrg({ id: 'orgId' })
    await orgRepo.create({ ...org, password_hash: org.password })
  })

  it('should create a new pet', async () => {
    const pet = await sut.execute({ ...makePet(), orgId: 'orgId' })

    expect(pet.id).toEqual(expect.any(String))
  })

  it('should create a new pet with complements', async () => {
    const pet = await sut.execute({
      ...makePet(),
      orgId: 'orgId',
    })

    expect(pet.id).toEqual(expect.any(String))
    expect(pet.complements).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
        }),
        expect.objectContaining({
          id: expect.any(String),
        }),
      ]),
    )
  })

  it('should not be able to create a new pet with invalid org', async () => {
    await expect(async () => {
      await sut.execute({ ...makePet() })
    }).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
