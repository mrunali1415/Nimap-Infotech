'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Check if the categoryName column already exists in the Products table
    const existingColumns = await queryInterface.describeTable('Products');

    // Check if the 'categoryName' property exists in the existingColumns object
    if (!existingColumns.hasOwnProperty('categoryName')) {
      // Add the categoryName column to the Products table
      await queryInterface.addColumn('Products', 'categoryName', {
        type: Sequelize.STRING,
        allowNull: true // or false depending on your requirements
      });
    } else {
      // If the column already exists, log a message or handle it as needed
      console.log("The 'categoryName' column already exists in the Products table.");
      // You can choose to skip the operation or handle it differently based on your requirements
    }
  },

  async down(queryInterface, Sequelize) {
    // Remove the categoryName column from the Products table
    await queryInterface.removeColumn('Products', 'categoryName');
  }
};
