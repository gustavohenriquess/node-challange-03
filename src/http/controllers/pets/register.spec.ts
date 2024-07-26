import { app } from '@/app'
import request from 'supertest'
import { makeOrg } from 'test/factories/make-org.factories'
import { makePet } from 'test/factories/make-pet.factories'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Register Pet- e2e', () => {
  beforeAll(async () => {
    app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to register', async () => {
    const org = makeOrg({ city: 'SÃO PAULO' })
    const pet = makePet({ city: org.city })

    await request(app.server).post('/orgs').send(org)

    const {
      body: { token },
    } = await request(app.server).post('/sessions').send({
      email: org.email,
      password: org.password,
    })

    const response = await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send(pet)

    expect(response.statusCode).toBe(201)
  })
})
