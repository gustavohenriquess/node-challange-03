import { describe, it, expect, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/orgs-repository'
import { AuthenticateOrgUseCase } from './authenticate-org'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { makeOrg } from 'test/factories/make-org.factories'

let orgsRepo: InMemoryOrgsRepository
let sut: AuthenticateOrgUseCase
describe('Authenticate UseCase', () => {
  beforeEach(() => {
    orgsRepo = new InMemoryOrgsRepository()
    sut = new AuthenticateOrgUseCase(orgsRepo)
  })

  it('should be able to authenticate', async () => {
    await orgsRepo.create(
      makeOrg({
        email: 'find.friend@gmail.com',
        password_hash: await hash('f1nd@fr13nd', 6),
      }),
    )

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
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await orgsRepo.create(
      makeOrg({
        email: 'find.friend@gmail.com',
        password_hash: await hash('f1nd@fr13nd', 6),
      }),
    )

    await expect(async () => {
      await sut.execute({
        email: 'find.friend@gmail.com',
        password: 'find@friend',
      })
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
