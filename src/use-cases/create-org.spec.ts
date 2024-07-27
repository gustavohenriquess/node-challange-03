import { describe, it, beforeEach, expect } from 'vitest'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/orgs-repository'
import { CreateOrgUseCase } from './create-org'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'
import { compare } from 'bcryptjs'
import { makeOrg } from 'test/factories/make-org.factories'
import { InMemoryLocationService } from '@/services/in-memory/location'

let repository: InMemoryOrgsRepository
let sut: CreateOrgUseCase
let service: InMemoryLocationService

describe('Create Org', () => {
  beforeEach(() => {
    repository = new InMemoryOrgsRepository()
    service = new InMemoryLocationService()
    sut = new CreateOrgUseCase(repository, service)
  })

  it('should create a new org', async () => {
    const { org } = await sut.execute(makeOrg())

    expect(org.id).toEqual(expect.any(String))
    expect(org.city).toEqual(expect.any(String))
    expect(org.state).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const orgData = makeOrg()
    const { org } = await sut.execute(orgData)

    const isPasswordHashed = await compare(orgData.password, org.password_hash)

    expect(isPasswordHashed).toBe(true)
  })

  it('should not be able to create a new org with same e-mail twice', async () => {
    const email = 'org@mail.com'

    await sut.execute(makeOrg({ email }))

    await expect(async () => {
      await sut.execute(makeOrg({ email }))
    }).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })
})
