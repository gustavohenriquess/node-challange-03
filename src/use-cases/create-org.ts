import { OrgsRepository } from '@/repositories/orgs-repository'
import { Org } from '@prisma/client'
import { hash } from 'bcryptjs'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'
import { LocationService } from '@/services/location'

interface CreateOrgRequest {
  name: string
  email: string
  person_responsible: string | undefined
  postal_code: string
  cell_phone: string
  password: string
}

interface CreateOrgResponse {
  org: Org
}
export class CreateOrgUseCase {
  constructor(
    private orgsRepo: OrgsRepository,
    private locationService: LocationService,
  ) {}

  async execute({
    name,
    email,
    password,
    person_responsible,
    postal_code,
    cell_phone,
  }: CreateOrgRequest): Promise<CreateOrgResponse> {
    const orgAlreadyExists = await this.orgsRepo.findByEmail(email)

    if (orgAlreadyExists) {
      throw new OrgAlreadyExistsError()
    }

    const password_hash = await hash(password, 6)

    const { city, state } = await this.locationService.getCep(postal_code)

    const org = await this.orgsRepo.create({
      name,
      email,
      person_responsible,
      postal_code,
      cell_phone,
      password_hash,
      state,
      city,
    })
    return { org }
  }
}
