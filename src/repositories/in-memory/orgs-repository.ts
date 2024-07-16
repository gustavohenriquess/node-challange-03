import { Org, Prisma } from '@prisma/client'
import { OrgsRepository } from '../orgs-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryOrgsRepository implements OrgsRepository {
  public orgs: Org[] = []

  async create(data: Prisma.OrgCreateInput): Promise<Org> {
    const org = {
      id: data.id ?? randomUUID(),
      ...data,
      person_responsible: data.person_responsible ?? null,
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

  async findByEmail(email: string) {
    return this.orgs.find((org) => org.email === email) ?? null
  }

  async findById(id: string) {
    return this.orgs.find((org) => org.id === id) ?? null
  }
}
