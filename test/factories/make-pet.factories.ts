import { faker } from '@faker-js/faker'
import crypto from 'node:crypto'

type Complements = {
  photo_url?: string
  requirement?: string
}

type Overwrite = {
  name: string
  about: string
  age: number
  energy: 'ONE' | 'TWO' | 'THREE' | 'FOUR' | 'FIVE'
  size: 'SMALL' | 'MEDIUM' | 'LARGE'
  independence: 'SMALL' | 'MEDIUM' | 'LARGE'
  sex: 'MALE' | 'FEMALE'
  type: 'DOG' | 'CAT' | 'BIRD' | 'FISH' | 'REPTILE' | 'RODENT' | 'OTHER'
  environment: 'SMALL' | 'MEDIUM' | 'LARGE'
  orgId: string
  complements?: Complements[]
}

export function makePet(overwrite?: Overwrite) {
  const id = crypto.randomUUID()
  return {
    pet: {
      id,
      org_id: overwrite?.orgId ?? crypto.randomUUID(),
      name: faker.animal.dog(),
      about: faker.lorem.paragraph(),
      age: overwrite?.age ?? faker.number.int().toString(),
      city: faker.location.city(),
      size:
        overwrite?.size ??
        faker.helpers.arrayElement(['SMALL', 'MEDIUM', 'LARGE']),
      independence:
        overwrite?.independence ??
        faker.helpers.arrayElement(['SMALL', 'MEDIUM', 'LARGE']),
      energy:
        overwrite?.energy ??
        faker.helpers.arrayElement(['ONE', 'TWO', 'THREE', 'FOUR', 'FIVE']),
      environment: faker.helpers.arrayElement(['SMALL', 'MEDIUM', 'LARGE']),
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
      created_at: new Date(),
    },
    complements: [
      {
        id: crypto.randomUUID(),
        photo_url: faker.image.url(),
        requirement: faker.lorem.words(20),
        created_at: new Date(),
        pet_id: id,
      },
      {
        id: crypto.randomUUID(),
        photo_url: faker.image.url(),
        requirement: faker.lorem.words(20),
        created_at: new Date(),
        pet_id: id,
      },
    ],
  }
}
