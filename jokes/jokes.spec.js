const request = require('supertest')
const router = require('../api/server')
const db = require('../database/dbConfig')

beforeAll(async () => {
  await db('users').truncate()
})

describe('jokes tests', () => {
  describe('[POST] /api/jokes endpoint', () => {
    test('the db env is testing', () => {
      expect(process.env.DB_ENV).toBe('testing')
    })

    test('should return 200 OK', async () => {
      const response = await request(router)
        .get('/api/jokes')
        .set('Accept', 'application/json')
        .set('Authorization', `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoyLCJ1c2VybmFtZSI6InB1em8iLCJpYXQiOjE1NzM4MDY1MTQsImV4cCI6MTU3Mzg5MjkxNH0.OuRAft9M6riull_abVBWp0KaOlcoCzGr5cushv-xixE`)
        .expect('Content-Type', /json/)

      expect(response.status).toBe(200)
    })   
    test('should return 401', async () => {
      const response = await request(router)
        .get('/api/jokes')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)

      expect(response.status).toBe(401)
    })    
  })
})