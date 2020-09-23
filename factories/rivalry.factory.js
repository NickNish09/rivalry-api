const Rivalry = require('../src/app/models/rivalry');
const { createRival } = require('./rival.factory');
const { factory } = require('./index');

factory.define('rivalry', Rivalry, {
	"title": "Messi x CR7",
	"about": "Messi and CR7 are the best players of all time"
});

const createRivalry = async () => {
  const rivalry = await factory.build('rivalry');
  rivalry.rivals = [createRival(), createRival("Cristiano Ronaldo", "Second best player of all time")];
  await rivalry.save();
  return rivalry;
};

module.exports = { createRivalry };
