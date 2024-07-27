import { Faker, pt_BR } from '@faker-js/faker'
import crypto from 'node:crypto'

type Complements = {
  photo_url?: string
  requirement?: string
}

type Overwrite = {
  id?: string
  name?: string
  about?: string
  age?: number
  city?: string
  energy?: 'ONE' | 'TWO' | 'THREE' | 'FOUR' | 'FIVE'
  size?: 'SMALL' | 'MEDIUM' | 'LARGE'
  independence?: 'SMALL' | 'MEDIUM' | 'LARGE'
  sex?: 'MALE' | 'FEMALE'
  type?: 'DOG' | 'CAT' | 'BIRD' | 'FISH' | 'REPTILE' | 'RODENT' | 'OTHER'
  environment?: 'SMALL' | 'MEDIUM' | 'LARGE'
  orgId?: string
  complements?: Complements[]
}

export function makePet(overwrite?: Overwrite) {
  const faker = new Faker({
    locale: [pt_BR],
  })

  return {
    id: overwrite?.id ?? crypto.randomUUID(),
    orgId: overwrite?.orgId ?? crypto.randomUUID(),
    org_id: overwrite?.orgId ?? crypto.randomUUID(),
    name: faker.person.fullName(),
    about: faker.lorem.paragraph(),
    age: overwrite?.age ?? faker.number.int(10),
    city: overwrite?.city ?? faker.location.city(),
    size:
      overwrite?.size ??
      faker.helpers.arrayElement(['SMALL', 'MEDIUM', 'LARGE']),
    independence:
      overwrite?.independence ??
      faker.helpers.arrayElement(['SMALL', 'MEDIUM', 'LARGE']),
    energy:
      overwrite?.energy ??
      faker.helpers.arrayElement(['ONE', 'TWO', 'THREE', 'FOUR', 'FIVE']),
    environment:
      overwrite?.environment ??
      faker.helpers.arrayElement(['SMALL', 'MEDIUM', 'LARGE']),
    sex: overwrite?.sex ?? faker.helpers.arrayElement(['MALE', 'FEMALE']),
    type:
      overwrite?.type ??
      faker.helpers.arrayElement([
        'DOG',
        'CAT',
        'BIRD',
        'FISH',
        'REPTILE',
        'RODENT',
        'OTHER',
      ]),
    complements: overwrite?.complements ?? [
      {
        photo_url: faker.image.url(),
        requirement: faker.lorem.words(20),
      },
      {
        photo_url: faker.image.url(),
        requirement: faker.lorem.words(20),
      },
    ],
  }
}
