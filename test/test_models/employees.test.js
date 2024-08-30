/**
 * Testing the employees model that is built into
 * the model.
 */

// Import dotenv.
const dotenv = require('dotenv');
dotenv.config();

const { Employee, DataTypes } = require('../../models/employees');
const { mocker } = require('mocker-data-generator');
const { faker } = require('@faker-js/faker');
const Chance = require('chance');

const chance = new Chance();

beforeEach( async() => {
  await Employee.drop();
})

test('Check if database creates new employees', async () => {
  // Create a new Employee.
  await Employee.sync({force: true});
  const jane = await Employee.create({
    name: 'jane doe',
    address: 'stadium junction',
    email: 'janedoe@mail.com',
    phone: '+23499999909',
    position: 'General Manager',
    department: 'Sales & Logistics',
  });
  expect(jane.name).toBe('jane doe');
  //expect(jane.id).toBeInstanceOf(String);
  expect(String(jane.id).length).toBeGreaterThan(10);
  expect(jane.address).toBe('stadium junction');
  expect(jane.email).toBe('janedoe@mail.com');
  expect(jane.phone).toBe('+23499999909');
  expect(jane.position).toBe('General Manager');
  expect(jane.department).toBe('Sales & Logistics');
  expect(jane.nonExistent).toBeUndefined();
});

describe('test only for null values', () => {

  var emp1;
  var emp2;

  beforeEach(() => {
    const employees = {
      name: {
        function: function () {
          return (
            `${faker.person.firstName()} ${faker.person.lastName()}`
          );
        },
      },
      address: {
        chance: 'address()',
      },
      email: {
        faker: 'internet.email()',
      },
      phone: {
        faker: 'phone.number()'
      },
      position: {
        values: ['novice', 'star1', 'Asst. General Manager', 'General Manager', 'Director', 'N/A'],
      },
      department: {
        values: ['Sales & Logistics', 'QC Lab', 'Raw Materials', 'Security', 'N/A'],
      }
    }
    const data = mocker()
      .addGenerator('faker', faker)
      .addGenerator('chance', chance)
      .schema('employees', employees, 2)
      .buildSync();
    emp1 = data.employees[0]
    emp2 = data.employees[1]
    console.log(`employe 1 is ${emp1.name}`);
    console.log(`employe 2 is ${emp2.address}`);
  });

  test('test for null name', async () => {
    console.log(`employe 1 is ${emp1}`);
    console.log(`employe 2 is ${emp2}`);
    await Employee.sync();
    try {
      await Employee.create({
        // name: 'jane',
        address: emp1.address,
        email: emp1.email,
        phone: emp1.phone,
        position: emp1.position,
        department: emp1.department,
      });
    } catch (error) {
      expect(error).toMatch('Name cannot be null');
    }
  })
  test('test for null address', async () => {
    console.log(`employe 1 is ${emp1}`);
    console.log(`employe 2 is ${emp2}`);
    await Employee.sync();
    try {
      await Employee.create({
        name: emp1.name,
        // address: emp1.address,
        email: emp1.email,
        phone: emp1.phone,
        position: emp1.position,
        department: emp1.department,
      });
    } catch (error) {
      expect(error).toMatch('Address cannot be null');
    }
  })
  test('test for null email', async () => {
    console.log(`employe 1 is ${emp1}`);
    console.log(`employe 2 is ${emp2}`);
    await Employee.sync();
    try {
      await Employee.create({
        name: emp1.name,
        address: emp1.address,
        // email: emp1.email,
        phone: emp1.phone,
        position: emp1.position,
        department: emp1.department,
      });
    } catch (error) {
      expect(error).toMatch('Email cannot be null');
    }
  })
  test('test for null phone', async () => {
    console.log(`employe 1 is ${emp1}`);
    console.log(`employe 2 is ${emp2}`);
    await Employee.sync();
    try {
      await Employee.create({
        name: emp1.name,
        address: emp1.address,
        email: emp1.email,
        // phone: emp1.phone,
        position: emp1.position,
        department: emp1.department,
      });
    } catch (error) {
      expect(error).toMatch('Phone number cannot be null');
    }
  })
  test('test for null position', async () => {
    console.log(`employe 1 is ${emp1}`);
    console.log(`employe 2 is ${emp2}`);
    await Employee.sync();
    try {
      await Employee.create({
        name: emp1.name,
        address: emp1.address,
        email: emp1.email,
        phone: emp1.phone,
        // position: emp1.position,
        department: emp1.department,
      });
    } catch (error) {
      expect(error).toMatch('Positon cannot be null');
    }
  })
  test('test for null department', async () => {
    await Employee.sync();
    try {
      await Employee.create({
        name: emp1.name,
        address: emp1.address,
        email: emp1.email,
        phone: emp1.phone,
        position: emp1.position,
        // department: emp1.department,
      });
    } catch (error) {
      expect(error).toMatch('Positon cannot be null');
    }
  })
})
