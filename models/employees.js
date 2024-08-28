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
    allowNull: {
      args: false,
      msg: 'Name cannot be null'
    },
    notEmpty: {
      msg: 'Name cannot be empty'
    },
    validate: {
      is: {
        args: /^[a-zA-Z]+\s?[a-zA-Z]*$/i,
        msg: 'Regex pattern does not match'
      }
    }
  },
  address: {
    type: DataTypes.STRING,
    allowNull: {
      args: false,
      msg: 'Address cannot be null'
    },
    notEmpty: {
      msg: 'Address cannot be empty'
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: {
      args: false,
      msg: 'Email cannot be null'
      },
    notEmpty: {
      msg: 'Email cannot be empty'
    },
    validate: {
      isEmail: {
        msg: 'Invalid Email Address'
  }
}
},
  phone: {
    type: DataTypes.STRING(32),
    allowNull: {
      args: false,
      msg: 'Phone number cannot be null'
    },
    notEmpty: {
      msg: 'Phone number cannot be empty'
    }
    // TODO: il8n/l18n?
  },
  position: {
    type: DataTypes.STRING,
    allowNull: {
      args: false,
      msg: 'Position cannot be null'
    },
    notEmpty: {
      msg: 'Position cannot be empty'
    }
    // TODO: Handle constraint of positions available in logic
    // side of things.
  },
  department: {
    type: DataTypes.STRING,
    allowNull: {
      args: false,
      msg: 'Department cannot be null'
    },
    notEmpty: {
      msg: 'Department cannot be empty'
    }
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
module.exports = { Employee, DataTypes };
