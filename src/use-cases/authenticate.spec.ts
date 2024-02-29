import { describe, it, expect, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/orgs-repository'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { ResourceNotFoundError } from './errors/resource-not-found'

let orgsRepo: InMemoryOrgsRepository
let sut: AuthenticateUseCase
describe.only('Authenticate UseCase', () => {
  beforeEach(() => {
    orgsRepo = new InMemoryOrgsRepository()
    sut = new AuthenticateUseCase(orgsRepo)
  })

  it('should be able to authenticate', async () => {
    await orgsRepo.create({
      name: 'Find a Friend',
      email: 'find.friend@gmail.com',
      password_hash: await hash('f1nd@fr13nd', 6),
      postal_code: '09070000',
      cell_phone: '11987654321',
      state: 'SP',
      city: 'SAO PAULO',
    })

    const { org } = await sut.execute({
      email: 'find.friend@gmail.com',
      password: 'f1nd@fr13nd',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(async () => {
      await sut.execute({
        email: 'find.friend@gmail.com',
        password: 'f1nd@fr13nd',
      })
    }).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await orgsRepo.create({
      name: 'Find a Friend',
      email: 'find.friend@gmail.com',
      password_hash: await hash('f1nd@fr13nd', 6),
      postal_code: '09070000',
      cell_phone: '11987654321',
      state: 'SP',
      city: 'SAO PAULO',
    })

    await expect(async () => {
      await sut.execute({
        email: 'find.friend@gmail.com',
        password: 'find@friend',
      })
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
