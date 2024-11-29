const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const { v4: uuidv4 } = require('uuid');

const Category = sequelize.define('Category', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    defaultValue: () => uuidv4(),
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
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
  tableName: 'categories',
});

module.exports = Category;
