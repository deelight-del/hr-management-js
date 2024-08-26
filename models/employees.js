/**
 * Module to contain the model description of
 * Employees.
 */

const { sequelize, DataTypes } = require('../config/db');

const Employee = sequelize.define('Employee', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: /^[a-zA-Z]+\s[a-zA-Z]*$/i,
    }
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: {
        message: 'Invalid Email Address'
      }
    }
  },
  phone: {
    type: DataTypes.STRING(32),
    allowNull: false
    // TODO: il8n/l18n?
  },
  position: {
    type: DataTypes.STRING,
    allowNull: false
    // TODO: Handle constraint of positions available in logic
    // side of things.
  },
  department: {
    type: DataTypes.STRING,
    allowNull: false
    // TODO: Handle constraint of departments available in logic
    // side of things.
  }
});

/**(async () => {
  await sequelize.sync({ force: true });
  const jane = await Employee.create({
    name: 'jane',
    address: '123 doe street',
    email: 'jane@gmail.com',
    phone: '+124 567 890',
    position: 'head of operations',
    department: 'chemistry and sci.'
  })
  console.log(`${jane.toJSON().name} lives in ${jane.address}`);
})();
*/


//FIX: Fix isAlpha constraint on the name field.
module.exports = { Employee };
