const { mocker } = require('mocker-data-generator');
const { faker } = require('@faker-js/faker');
const Chance  = require('chance');

const chance = new Chance();

const cat = {
  id: {
    chance: 'guid()',
  },
  name: {
    faker: 'internet.userName()',
  }
}

console.log(faker.internet.userName());
console.log(chance.guid());
const data = mocker()
  .addGenerator('faker', faker)
  .addGenerator('chance', chance)
  .schema('cat', cat, 2)
  .buildSync();

data.cat[0].id = 1;
console.log(data.cat[0]);
