import { app } from '@/app'
import request from 'supertest'
import { makeOrg } from 'test/factories/make-org.factories'
import { makePet } from 'test/factories/make-pet.factories'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Search Pet- e2e', () => {
  beforeAll(async () => {
    app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to search', async () => {
    const org = makeOrg({ city: 'São Paulo' })
    const pet = makePet({ city: org.city })

    await request(app.server).post('/orgs').send(org)

    const {
      body: { token },
    } = await request(app.server).post('/sessions').send({
      email: org.email,
      password: org.password,
    })

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send(pet)

    const response = await request(app.server)
      .get('/pets')
      .query({ city: org.city, page: 1 })
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body.pets).toHaveLength(1)
  })
})
