import { app } from '@/app'
import { Faker, pt_BR } from '@faker-js/faker'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Register - e2e', () => {
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

    const response = await request(app.server).post('/orgs').send({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      cell_phone: faker.phone.number(),
      person_responsible: faker.person.fullName(),
      postal_code: faker.location.zipCode(),
    })

    expect(response.statusCode).toBe(201)
  })
})
