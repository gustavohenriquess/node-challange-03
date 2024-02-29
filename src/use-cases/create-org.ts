import { OrgsRepository } from '@/repositories/orgs-repository'
import { Org } from '@prisma/client'
import { hash } from 'bcryptjs'
import axios from 'axios'

interface CreateOrgRequest {
  name: string
  email: string
  person_responsible: string
  postal_code: string
  cell_phone: string
  password: string
}

interface CreateOrgResponse {
  org: Org
}
export class CreateOrgUseCase {
  constructor(private orgsRepo: OrgsRepository) {}

  async execute({
    name,
    email,
    password,
    person_responsible,
    postal_code,
    cell_phone,
  }: CreateOrgRequest): Promise<CreateOrgResponse> {
    console.log('Creating org...')

    const password_hash = await hash(password, 6)

    const resp = await axios.get(
      `https://api.brasilaberto.com/v1/zipcode/${postal_code}`,
    )

    const { city, state } = resp.data.result
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
