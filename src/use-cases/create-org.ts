import { OrgsRepository } from '@/repositories/orgs-repository'

interface CreateOrgRequest {
  name: string
  person_responsible: string
  postal_code: string
  cell_phone: string
  password: string
}

export class CreateOrgUseCase {
  constructor(private orgRepo: OrgsRepository) {}

  async execute(org: CreateOrgRequest) {
    return org
  }
}
