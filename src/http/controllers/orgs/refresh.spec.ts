import { app } from '@/app'
import { Faker, pt_BR } from '@faker-js/faker'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Refresh - e2e', () => {
  beforeAll(async () => {
    app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to refresh a token', async () => {
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

    const cookies = authResponse.get('Set-Cookie')

    const response = await request(app.server)
      .patch('/token/refresh')
      .set('Cookie', cookies)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ])
  })
})
