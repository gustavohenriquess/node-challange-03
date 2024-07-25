import { app } from '@/app'
import { Faker, pt_BR } from '@faker-js/faker'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Register Pet- e2e', () => {
  beforeAll(async () => {
    app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to register', async () => {
    const faker = new Faker({
      locale: [pt_BR],
    })

    const email = faker.internet.email()
    const password = faker.internet.password()

    await request(app.server).post('/orgs').send({
      name: faker.person.fullName(),
      email,
      password,
      cell_phone: faker.phone.number(),
      person_responsible: faker.person.fullName(),
      postal_code: faker.location.zipCode(),
    })

    const authResponse = await request(app.server).post('/sessions').send({
      email,
      password,
    })

    const { token } = authResponse.body

    const response = await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: faker.person.fullName(),
        about: faker.lorem.paragraph(),
        age: faker.number.int(10),
        energy: faker.helpers.arrayElement([
          'ONE',
          'TWO',
          'THREE',
          'FOUR',
          'FIVE',
        ]),
        environment: faker.helpers.arrayElement(['SMALL', 'MEDIUM', 'LARGE']),
        independence: faker.helpers.arrayElement(['SMALL', 'MEDIUM', 'LARGE']),
        sex: faker.helpers.arrayElement(['MALE', 'FEMALE']),
        size: faker.helpers.arrayElement(['SMALL', 'MEDIUM', 'LARGE']),
        type: faker.helpers.arrayElement([
          'DOG',
          'CAT',
          'BIRD',
          'FISH',
          'REPTILE',
          'RODENT',
          'OTHER',
        ]),
      })
    expect(response.statusCode).toBe(201)
  })
})
