const mongoose = require('mongoose');
const User = require('../../src/app/models/user');

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
  done()
});

// close db connection
afterAll(async (done) => {
  await mongoose.connection.close()
  done()
})

describe('User model tests', () => {
  describe('User model validations', () => {
    test('user should be created correctly if all fields are correct', async () => {
      const userData = {
        name: 'Nicholas Marques',
        email: 'nnmarques97@gmail.com',
        password: '123456',
      };

      const user = await User.create(userData);
      expect(user.name).toBe(userData.name);
      expect(user.email).toBe(userData.email);
    });

    test('user should not be created correctly if missing fields ', async () => {
      const userData = {
        name: 'Nicholas',
        password: '123456',
      };

      return User.create(userData).catch((err) => {
        expect(err).toBeTruthy();
      });
    });
  });
});
