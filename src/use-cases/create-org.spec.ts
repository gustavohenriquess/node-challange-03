import { InMemoryOrgsRepository } from '@/repositories/in-memory/orgs-repository'
import { describe, it, beforeEach, expect } from 'vitest'
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
      person_responsible: 'Person',
      postal_code: '123',
      cell_phone: '123',
      password: '123',
    })

    expect(org.id).toEqual(expect.any(String))
  })
})
