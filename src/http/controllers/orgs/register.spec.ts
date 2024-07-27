import { app } from '@/app'
import request from 'supertest'
import { makeOrg } from 'test/factories/make-org.factories'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Register Org - e2e', () => {
  beforeAll(async () => {
    app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to register', async () => {
    const response = await request(app.server).post('/orgs').send(makeOrg())

    expect(response.statusCode).toBe(201)
  })
})
