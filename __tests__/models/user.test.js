const { User } = require('../../src/app/models/user');

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
