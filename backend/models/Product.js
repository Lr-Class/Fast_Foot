const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const { v4: uuidv4 } = require('uuid');
const Category = require('./Category');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    defaultValue: () => uuidv4(),
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  image_url: {
    type: DataTypes.STRING,
  },
  category_id: {
    type: DataTypes.STRING,
    references: {
      model: Category,
      key: 'id',
    }
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: false,
  tableName: 'products',
});

module.exports = Product;
