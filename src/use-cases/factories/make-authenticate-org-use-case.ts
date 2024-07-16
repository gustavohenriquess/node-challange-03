import { AuthenticateOrgUseCase } from '../authenticate-org'
import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'

export function makeAuthenticateOrgUseCase() {
  const orgRepository = new PrismaOrgsRepository()
  const uc = new AuthenticateOrgUseCase(orgRepository)

  return uc
}
