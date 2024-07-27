import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { CreateOrgUseCase } from '../create-org'
import { LocationServicePartner } from '@/services/partners/location'

export function makeCreateOrgUseCase() {
  const orgRepository = new PrismaOrgsRepository()
  const locationService = new LocationServicePartner()
  const uc = new CreateOrgUseCase(orgRepository, locationService)

  return uc
}
