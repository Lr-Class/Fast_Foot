const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const { v4: uuidv4 } = require('uuid');

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    defaultValue: () => uuidv4(),
  },
  customer_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  customer_address: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  customer_phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  total_amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'completed', 'cancelled'),
    defaultValue: 'pending',
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
  tableName: 'orders',
});

module.exports = Order;
