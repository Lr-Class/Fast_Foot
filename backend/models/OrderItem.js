const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const { v4: uuidv4 } = require('uuid');
const Order = require('./Order');
const Product = require('./Product');

const OrderItem = sequelize.define('OrderItem', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    defaultValue: () => uuidv4(),
  },
  order_id: {
    type: DataTypes.STRING,
    references: {
      model: Order,
      key: 'id',
    },
  },
  product_id: {
    type: DataTypes.STRING,
    references: {
      model: Product,
      key: 'id',
    },
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  unit_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  subtotal: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: false,
  tableName: 'order_items',
});

module.exports = OrderItem;
