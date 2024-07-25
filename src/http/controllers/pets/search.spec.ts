import { app } from '@/app'
import { Faker, pt_BR } from '@faker-js/faker'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Search Pet- e2e', () => {
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

    await request(app.server)
      .post('/orgs')
      .send({
        name: faker.person.fullName(),
        email,
        password,
        cell_phone: faker.phone.number(),
        person_responsible: faker.person.fullName(),
        postal_code: faker.location.zipCode('04560-011'),
      })

    const authResponse = await request(app.server).post('/sessions').send({
      email,
      password,
    })

    const { token } = authResponse.body
    const pet = {
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
    }
    const createPet = await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send(pet)

    expect(createPet.statusCode).toBe(201)

    const response = await request(app.server)
      .get('/pets')
      .query({ city: 'SÃO PAULO', page: 1 })
      .send()

    expect(response.body.pets).toHaveLength(1)
    console.log(response.body.pets)
    expect(response.body.pets).toEqual([
      expect.objectContaining({
        pet: expect.objectContaining(pet),
      }),
    ])
  })
})
