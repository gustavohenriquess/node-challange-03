import { describe, it, beforeEach, expect } from 'vitest'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/orgs-repository'
import { CreateOrgUseCase } from '../create-org'
import { OrgAlreadyExistsError } from '../errors/org-already-exists-error'
import { compare } from 'bcryptjs'

let repository: InMemoryOrgsRepository
let sut: CreateOrgUseCase

describe('Create Org', () => {
  beforeEach(() => {
    repository = new InMemoryOrgsRepository()
    sut = new CreateOrgUseCase(repository)
  })

  it('should create a new org', async () => {
    const { org } = await sut.execute({
      name: 'Org',
      email: 'org@mail.com',
      person_responsible: 'Person',
      postal_code: '09070000',
      cell_phone: '123',
      password: '123',
    })

    expect(org.id).toEqual(expect.any(String))
    expect(org.city).toEqual(expect.any(String))
    expect(org.state).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { org } = await sut.execute({
      name: 'Org',
      email: 'org@mail.com',
      person_responsible: 'Person',
      postal_code: '09070000',
      cell_phone: '123',
      password: '123',
    })

    const isPasswordHashed = await compare('123', org.password_hash)

    expect(isPasswordHashed).toBe(true)
  })

  it('should not be able to create a new org with same e-mail twice', async () => {
    const email = 'org@mail.com'

    await sut.execute({
      name: 'Org',
      email,
      person_responsible: 'Person',
      postal_code: '09070000',
      cell_phone: '123',
      password: '123',
    })

    await expect(async () => {
      await sut.execute({
        name: 'Org',
        email,
        person_responsible: 'Person',
        postal_code: '09070000',
        cell_phone: '123',
        password: '123',
      })
    }).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })
})
