/**
 * Module to contain the model description of
 * Employees.
 */

const { sequelize, DataTypes } = require('../config/db');

const Employee = sequelize.define('Employee', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: {
      args: false,
      msg: 'id cannot be null'
      },
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: {
        args: /^[a-zA-Z'-]+\s?[a-zA-Z'-]*$/i,
        msg: 'Regex pattern does not match, expecting `firstName secondName`'
        // TODO: Regex pattern should have special chars name, like German, Yoruba special chars, etc.
      },
    }
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
    notEmpty: {
      msg: 'Address cannot be empty'
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: {
        msg: 'Invalid Email Address/Empty'
  }
  // TODO: Implement and ensure unique email at business logic.
}
},
  phone: {
    type: DataTypes.STRING(32),
    allowNull: false,
    notEmpty: {
      msg: 'Phone number cannot be empty'
    }
    // TODO: il8n/l18n?
  },
  position: {
    type: DataTypes.STRING,
    allowNull: false,
    notEmpty: {
      msg: 'Position cannot be empty'
    }
    // TODO: Handle constraint of positions available in logic
    // side of things.
  },
  department: {
    type: DataTypes.STRING,
    allowNull: false,
    notEmpty: {
      msg: 'Department cannot be empty'
    },
    // TODO: Handle constraint of departments available in logic
    // side of things.
  }
});

(async () => {
  await sequelize.sync();
  // console.log('I was able to get here');
  //const jane = await Employee.create({
  //  name: 'jane',
  //  address: '123 doe street',
  // email: 'jane@gmail.com',
  //  phone: '+124 567 890',
  //  position: 'head of operations',
  //  department: 'chemistry and sci.'
  //})
  // console.log(`${jane.toJSON().name} lives in ${jane.address}`);
})();

module.exports = { Employee, DataTypes };
