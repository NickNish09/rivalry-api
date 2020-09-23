const Rival = require('../src/app/models/rival');
const { factory } = require('./index');

factory.define('rival', Rival, {
    name: 'Lionel Messi',
    about: 'The best football player of all times'
});

const createRival = async (name, about) => {
  if(name !== undefined && about !== undefined){
    const rival = await factory.build('rival', { name, about });
  } else {
    const rival = await factory.build('rival');
  }
  await rival.save();
  return rival;
};

module.exports = { createRival };
