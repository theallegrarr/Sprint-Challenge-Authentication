const request = require('supertest')
const router = require('../api/server')
const db = require('../database/dbConfig')

beforeAll(async () => {
  await db('users').truncate()
})

describe('register & login tests', () => {
  describe('[POST] /api/auth/register endpoint', () => {
    test('the db env is testing', () => {
      expect(process.env.DB_ENV).toBe('testing')
    })

    test('should return 201 Created', async () => {
      const response = await request(router)
        .post('/api/auth/register')
        .send({ username: 'Kantos', password: '1234' })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(hasTokenAndUser)

      expect(response.status).toBe(201)
    })    
  })

  describe('[POST] /api/auth/login endpoint', () => {
    test('the db env is testing', () => {
      expect(process.env.DB_ENV).toBe('testing')
    })

    test('should return 200 OK', async () => {
      const response = await request(router)
        .post('/api/auth/login')
        .send({ username: 'Kantos', password: '1234' })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(hasTokenAndMessage)

      expect(response.status).toBe(200)
    })    
  })

  test('should return 401 Unauthorized', async () => {
    const response = await request(router)
      .post('/api/auth/login')
      .send({ username: 'Kantos', password: '565q' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)

    expect(response.status).toBe(401)
  })   
})


function hasTokenAndUser(res) {
  if (!('token' in res.body)) throw new Error("missing token key");
  if (!('user' in res.body)) throw new Error("missing user key");
}

function hasTokenAndMessage(res) {
  if (!('token' in res.body)) throw new Error("missing token key");
  if (!('message' in res.body)) throw new Error("missing message key");
}