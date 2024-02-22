import { Org, Prisma } from '@prisma/client'
import { OrgsRepository } from '../orgs-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryOrgsRepository implements OrgsRepository {
  public orgs: Org[] = []

  async create(data: Prisma.OrgCreateInput) {
    const org = {
      id: data.id ?? randomUUID(),
      name: data.name,
      email: data.email,
      person_responsible: data.person_responsible ?? null,
      postal_code: data.postal_code,
      cell_phone: data.cell_phone,
      password_hash: data.password_hash,
      state: data.state,
      city: data.city,
      latitude: data.latitude
        ? new Prisma.Decimal(data.latitude.toString())
        : null,
      longitude: data.longitude
        ? new Prisma.Decimal(data.longitude.toString())
        : null,
      created_at: new Date(),
    }

    this.orgs.push(org)
    return org
  }

  async findByName(name: string) {
    return this.orgs.find((org) => org.name === name) ?? null
  }

  async findById(id: string) {
    return this.orgs.find((org) => org.id === id) ?? null
  }
}
