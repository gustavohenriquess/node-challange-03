import { Org, Prisma } from '@prisma/client'
import { OrgsRepository } from '../orgs-repository'
import { prisma } from '@/lib/prisma'

export class PrismaOrgsRepository implements OrgsRepository {
  async create(data: Prisma.OrgCreateInput): Promise<Org> {
    return await prisma.org.create({ data })
  }

  async findByName(name: string): Promise<Org | null> {
    return await prisma.org.findUnique({ where: { name } })
  }

  async findByEmail(email: string): Promise<Org | null> {
    return await prisma.org.findUnique({ where: { email } })
  }

  async findById(id: string): Promise<Org | null> {
    return await prisma.org.findUnique({ where: { id } })
  }
}
