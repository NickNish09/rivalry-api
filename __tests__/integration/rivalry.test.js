const request = require('supertest');
const app = require('../../src/app');
const mongoose = require('mongoose');
const Rivalry = require('../../src/app/models/rivalry');
// reset the db for testing
beforeAll(async (done) => {
  const mongoUri = 'mongodb://localhost:27017/rivalry' // test db
  mongoose.connect(mongoUri,
      {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
      })
      .then(result => {
      console.log('MongoDB Conectado')
      })
      .catch(error => {
      console.log(error)
      })
  await Rivalry.remove({}, function (err) {
      console.log('collection removed')
      console.log(err)
  })
  done()
});
  
// close db connection
afterAll(async (done) => {
  await mongoose.connection.close()
  done()
})

describe('GET #index', () => {
  test('It should response the GET method', async () => {
    const response = await request(app).get('/v1/rivalries')
    expect(response.status).toBe(200)
  })
})