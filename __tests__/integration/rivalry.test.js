const request = require('supertest');
const app = require('../../src/app');
const mongoose = require('mongoose');
const Rivalry = require('../../src/app/models/rivalry');
const Rival = require('../../src/app/models/rival');
const User = require('../../src/app/models/user');
const { createRivalry } = require('../../factories/rivalry.factory');
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
  await User.remove({}, function (err) {
    console.log('collection removed')
    console.log(err)
  })
  await Rival.remove({}, function (err) {
    console.log('collection removed')
    console.log(err)
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

  test('It should response an array with the rivalries', async () => {
    const rivalry = await createRivalry();
    const response = await request(app).get('/v1/rivalries')
    expect(response.body.rivalries.length).toEqual(1); // one rivalry created;
  })
})