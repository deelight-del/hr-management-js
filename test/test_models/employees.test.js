/**
 * Testing the employees model that is built into
 * the model.
 */

// Import dotenv.
const dotenv = require('dotenv');
dotenv.config();

const { Employee, DataTypes } = require('../../models/employees');

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
