const request = require('supertest')
const server = require('./server')

describe('server', () => {
  describe('[GET] / endpoint', () => {
    test('the db env is testing', () => {
      expect(process.env.DB_ENV).toBe('testing')
    })

    test('shoult return 200 OK', async () => {
      const response = await request(server).get('/')
      expect(response.status).toBe(200)
    })

    test('shoult return 200 OK with ES6 promise', () => {
      return request(server).get('/')
        .then(response => {
          expect(response.status).toBe(200)
        })
    })

    test('with supertest syntax', () => {
      return request(server).get('/')
        .expect(200)
        .expect({
          "message": "It's alive!"
        })
        .expect('Content-Length', "25")
        .expect('Content-Type', /json/)
    })

    test('returns the right response body', async () => {
      const response = await request(server).get('/')
      expect(response.body).toEqual({
        "message": "It's alive!"
    });
    })
  })
})
