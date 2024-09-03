/**
 * Testing the employees model that is built into
 * the model.
 */

// Import dotenv.
const dotenv = require('dotenv');
dotenv.config();

// Import the Employee models database.
const { Employee, DataTypes } = require('../../models/employees');

// Import validation Error from Sequelize.
const { ValidationError } = require('sequelize');

// Import libraries for creating mockdata for simulating test variables.
// mocker data generator uses faker and chance to create a schema for easy
// mock data generation.
const { mocker } = require('mocker-data-generator');
const { faker } = require('@faker-js/faker');
const Chance = require('chance');

// create instance of chance -- as shown in the doc.
const chance = new Chance();

// drop the Employee db before each test.

//beforeEach( async() => {
//  await Employee.drop();
//})

let emp1;
let emp2;

// Same generator format as above.
beforeEach(async() => {
  await Employee.drop();
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
});


// Manual testing if emplyees are created with expected variables.
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


// Grouping test fixtures into a dsecrible block.
// --> this block contains test only for non-nullable fields.
describe('test only for null values', () => {

  var emp1;
  var emp2;

  // useing the mocker data generator, create an array of objects that contain
  // some objects with mocked data.
  beforeEach(() => {
    // Create employees schema that is used by mocker-data-generator.
    const employees = {
      // name is a function that returns `firstname lastname`
      name: {
        function: function () {
          return (
            `${faker.person.firstName()} ${faker.person.lastName()}`
          );
        },
      },
      // employees uses chance (imported lib. above) to access its address() method.
      // synonymous to chance.address();
      address: {
        chance: 'address()',
      },
      // email uses faker(above) to generate emails.
      email: {
        faker: 'internet.email()',
      },
      phone: {
        faker: 'phone.number()'
      },
      // In postion, values tell the schema to randomly choose one of the
      // values from the array; same for department.
      position: {
        values: ['novice', 'star1', 'Asst. General Manager', 'General Manager', 'Director', 'N/A'],
      },
      department: {
        values: ['Sales & Logistics', 'QC Lab', 'Raw Materials', 'Security', 'N/A'],
      }
    }

    // generates an object where the schema is used to generate an array
    // of information;
    // addGenerator methods tell mocker which generators were effectively used
    // in the schema.
    
    const data = mocker()
      .addGenerator('faker', faker) // Naming is important i.e. `faker`.
      .addGenerator('chance', chance)
      .schema('employees', employees, 2)
      .buildSync(); // generate the data synchronously
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
      expect(error.message).toMatch('Name cannot be null');
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
      expect(error.message).toMatch('Address cannot be null');
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
      expect(error.message).toMatch('Email cannot be null');
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
      expect(error.message).toMatch('Phone number cannot be null');
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
      expect(error.message).toMatch('Positon cannot be null');
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
      expect(error.message).toMatch('Positon cannot be null');
    }
  })
})


describe('test only for empty values', () => {

  var emp1;
  var emp2;

  // Same generator format as above.
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
    // console.log(`employe 1 is ${emp1.name}`);
    // console.log(`employe 2 is ${emp2.address}`);
  });

  test('test for empty name', async () => {
    await Employee.sync();
    try {
      await Employee.create({
        name: '',
        address: emp1.address,
        email: emp1.email,
        phone: emp1.phone,
        position: emp1.position,
        department: emp1.department,
      });
    } catch (error) {
      expect(error.message).toMatch('Regex pattern does not match, expecting `firstName secondName`');
    }
  })
  test('test for empty address', async () => {
    await Employee.sync();
    try {
      await Employee.create({
        name: emp1.name,
        address: '',
        email: emp1.email,
        phone: emp1.phone,
        position: emp1.position,
        department: emp1.department,
      });
    } catch (error) {
      expect(error.message).toMatch('Address cannot be empty');
    }
  })
  test('test for empty email', async () => {
    await Employee.sync();
    try {
      await Employee.create({
        name: emp1.name,
        address: emp1.address,
        email: '',
        phone: emp1.phone,
        position: emp1.position,
        department: emp1.department,
      });
    } catch (error) {
      expect(error.message).toMatch('Invalid Email Address/Empty');
    }
  })
  test('test for empty phone', async () => {
    await Employee.sync();
    try {
      await Employee.create({
        name: emp1.name,
        address: emp1.address,
        email: emp1.email,
        phone: '',
        position: emp1.position,
        department: emp1.department,
      });
    } catch (error) {
      expect(error.message).toMatch('Phone number cannot be empty');
    }
  })
  test('test for empty position', async () => {
    await Employee.sync();
    try {
      await Employee.create({
        name: emp1.name,
        address: emp1.address,
        email: emp1.email,
        phone: emp1.phone,
        position: '',
        department: emp1.department,
      });
    } catch (error) {
      expect(error.message).toMatch('Positon cannot be empty');
    }
  })
  test('test for empty department', async () => {
    await Employee.sync();
    try {
      await Employee.create({
        name: emp1.name,
        address: emp1.address,
        email: emp1.email,
        phone: emp1.phone,
        position: emp1.position,
        department: '',
      });
    } catch (error) {
      expect(error.message).toMatch('Positon cannot be empty');
    }
  })

  describe('test that no two IDs are the same', () => {

    var emp1;
    var emp2;

    // Same generator format as above.
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
      // console.log(`employe 1 is ${emp1.name}`);
      // console.log(`employe 2 is ${emp2.address}`);
    });

    test('test for duplicate entry, but different auto generated IDs', async () => {
      await Employee.sync();
      try {
        await Employee.create({
          name: emp1.name,
          address: emp1.address,
          email: emp1.email,
          phone: emp1.phone,
          position: emp1.position,
          department: emp1.department,
        });
        await Employee.create({
          name: emp1.name,
          address: emp1.address,
          email: emp1.email,
          phone: emp1.phone,
          position: emp1.position,
          department: emp1.department,
        });
        await Employee.sync();
        const result = await Employee.findAndCountAll({
          where: {
            name: emp1.name,
          }
        })
        expect(result.count).toBe(2);
        expect(String(result.rows[0].id)).not.toEqual(String(result.rows[1].id));
      } catch (error) {
        // console.log(`eroor here ${error}`);
        expect(error).toBeUndefined;
      }
    });
  })

  describe('Behaiour of table when it is updated.', () => {

    test('test for name field when it is updated.', async () => {
      await Employee.sync();
      await Employee.create({
        name: emp1.name,
        address: emp1.address,
        email: emp1.email,
        phone: emp1.phone,
        position: emp1.position,
        department: emp1.department,
      });
      await Employee.sync(); // Sync from DB.
      let testEmp = await Employee.findOne( {where: { name: emp1.name } } ); // find the row with emp1.name.
      expect(testEmp.name).not.toBe(emp2.name);  //Test that emp1.name is not equal to emp2.name before update.

      // Update emp1.name to emp2.name.
      await Employee.update( {name: emp2.name },
        {
          where: { name: emp1.name }
        }
      )
      await Employee.sync(); // Sync from db.
      // Use the id obtained from DB query to access the same row.
      testEmp = await Employee.findOne( {where: { id: testEmp.id } } );
      expect(testEmp.name).toEqual(emp2.name); // expect name to be updated to emp2.name.
    });
  })

})
