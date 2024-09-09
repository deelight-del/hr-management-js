'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.changeColumn('Employees', 'name', {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.changeColumn('Employees', 'address', {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.changeColumn('Employees', 'email', {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.changeColumn('Employees', 'phone', {
      type: Sequelize.STRING(32),
      allowNull: false,
    });
    await queryInterface.changeColumn('Employees', 'department', {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.changeColumn('Employees', 'position', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.changeColumn('Employees', 'name', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.changeColumn('Employees', 'address', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.changeColumn('Employees', 'email', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.changeColumn('Employees', 'phone', {
      type: Sequelize.STRING(32),
      allowNull: true,
    });
    await queryInterface.changeColumn('Employees', 'department', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.changeColumn('Employees', 'position', {
      type: Sequelize.STRING,
      allowNull: true,
    });

  }
};
