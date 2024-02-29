import { describe, it, beforeEach, expect } from 'vitest'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/orgs-repository'
import { CreateOrgUseCase } from './create-org'

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
})
