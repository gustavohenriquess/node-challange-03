import { Faker, pt_BR } from '@faker-js/faker'
import crypto from 'node:crypto'

type Overwrite = {
  id?: string
  name?: string
  email?: string
  person_responsible?: string
  postal_code?: string
  cell_phone?: string
  password_hash?: string
  password?: string
  state?: string
  city?: string
}

export function makeOrg(overwrite?: Overwrite) {
  const faker = new Faker({
    locale: [pt_BR],
  })
  const pwd = faker.internet.password()

  return {
    id: overwrite?.id ?? crypto.randomUUID(),
    name: overwrite?.name ?? faker.company.name(),
    email: overwrite?.email ?? faker.internet.email(),
    person_responsible:
      overwrite?.person_responsible ?? faker.person.fullName(),
    postal_code: overwrite?.postal_code ?? faker.location.zipCode('04560-011'),
    cell_phone: overwrite?.cell_phone ?? faker.phone.number(),
    password: overwrite?.password ?? pwd,
    password_hash: overwrite?.password_hash ?? pwd,
    state: overwrite?.state ?? faker.location.state(),
    city: overwrite?.city ?? faker.location.city(),
    created_at: new Date(),
  }
}
