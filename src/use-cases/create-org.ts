import { OrgsRepository } from '@/repositories/orgs-repository'
import { Org } from '@prisma/client'

interface CreateOrgRequest {
  name: string
  person_responsible: string
  postal_code: string
  cell_phone: string
  password: string
}

interface CreateOrgResponse {
  org: Org
}
export class CreateOrgUseCase {
  constructor(private orgRepo: OrgsRepository) {}

  async execute(org: CreateOrgRequest): Promise<CreateOrgResponse> {}
}
