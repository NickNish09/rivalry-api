const jwt = require("jsonwebtoken");
const request = require('supertest');
const app = require('../../src/app');
const mongoose = require('mongoose');
const Rivalry = require('../../src/app/models/rivalry');
const Rival = require('../../src/app/models/rival');
const User = require('../../src/app/models/user');
const { createRivalry } = require('../../factories/rivalry.factory');
const authConfig = require("../../src/config/auth.json");
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
  it('should response the GET method', async () => {
    const response = await request(app).get('/v1/rivalries')
    expect(response.status).toBe(200)
  })

  it('should response an array with the rivalries', async () => {
    const rivalry = await createRivalry();
    const response = await request(app).get('/v1/rivalries')
    expect(response.body.rivalries.length).toEqual(1); // one rivalry created;
    expect(response.body.rivalries[0]['title']).toEqual('Messi x CR7'); // testing attributes of the response
    expect(response.body.rivalries[0]['about']).toEqual('Messi and CR7 are the best players of all time'); // testing attributes of the response
  })
})

describe('POST #create', () => {
  describe('with user authenticated', () => {
    let response;
    let user;
    let token;
    beforeAll(async () => {
      user = await User.findOne({});
      token = jwt.sign({id: user.id}, authConfig.secret, {
        expiresIn: 999 * 86400,
      });
      response = await request(app).post('/v1/rivalries').send({
        "title": "Messi x CR7",
        "about": "Messi and CR7 are the best players of all time",
        "rivals": [
          {
            "name": "Messi",
            "about": "Best argentinian player of all times"
          },
          {
            "name": "CR7",
            "about": "Best portuguese player of all times"
          }
        ]
      }).set('authorization', `Bearer ${token}`);
    });
    it('should response the POST method', async () => {
      expect(response.status).toBe(200)
    })

    it('should response the created rivalry', async () => {
      expect(response.body.rivalry.title).toEqual('Messi x CR7'); // testing attributes of the response
      expect(response.body.rivalry.about).toEqual('Messi and CR7 are the best players of all time'); // testing attributes of the response
    })
  });

  describe('without user authenticated', () => {
    let response;
    beforeAll(async () => {
      response = await request(app).post('/v1/rivalries').send({
        "title": "Messi x CR7",
        "about": "Messi and CR7 are the best players of all time",
        "rivals": [
          {
            "name": "Messi",
            "about": "Best argentinian player of all times"
          },
          {
            "name": "CR7",
            "about": "Best portuguese player of all times"
          }
        ]
      })
    });

    it('should return 401 status', async () => {
      expect(response.status).toBe(401)
    });

    it('should return an error message', async () => {
      expect(response.body.error).toEqual('No token provided');
    });
  });
})