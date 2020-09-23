const User = require('../src/app/models/user');
const { factory } = require('./index');

factory.define('user', User, {
    name: 'Nicholas Marques',
    email: 'nnmarques97@gmail.com',
    password: '123456'
});

const createUser = async () => {
  const user = await factory.build('user');
  await user.save();
  return user;
};

module.exports = { createUser };
