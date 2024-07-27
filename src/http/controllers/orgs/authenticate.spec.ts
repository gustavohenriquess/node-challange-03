import { app } from '@/app'
import { Faker, pt_BR } from '@faker-js/faker'
import request from 'supertest'
import { makeOrg } from 'test/factories/make-org.factories'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Authenticate - e2e', () => {
  beforeAll(async () => {
    app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to authenticate', async () => {
    const faker = new Faker({
      locale: [pt_BR],
    })

    const email = faker.internet.email()
    const password = faker.internet.password()

    const response = await request(app.server)
      .post('/orgs')
      .send(makeOrg({ email, password }))

    expect(response.statusCode).toBe(201)

    const auth = await request(app.server).post('/sessions').send({
      email,
      password,
    })
    expect(auth.statusCode).toBe(200)
    expect(auth.body).toEqual({
      token: expect.any(String),
    })
  })
})
