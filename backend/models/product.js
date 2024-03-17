const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Ensure this path is correct
const Category = require('./category'); // Ensure this path is correct

const Product = sequelize.define('Product', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Category,
            key: 'id'
        }
    },
    categoryName: {
        type: DataTypes.STRING,
        get() {
            if (this.getDataValue('category')) {
                return this.getDataValue('category').name;
            } else {
                return null;
            }
        }
    }
});

// Define association between Product and Category
Product.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });

// Before creating or updating a Product, set the categoryName based on the associated Category's name
Product.beforeCreate(async (product, options) => {
    const category = await Category.findByPk(product.categoryId);
    if (!category) {
        throw new Error('Category does not exist');
    }
    product.categoryName = category.name; // Populate categoryName based on category name
});

Product.beforeUpdate(async (product, options) => {
    const category = await Category.findByPk(product.categoryId);
    if (!category) {
        throw new Error('Category does not exist');
    }
    product.categoryName = category.name; // Populate categoryName based on category name
});

module.exports = Product;
