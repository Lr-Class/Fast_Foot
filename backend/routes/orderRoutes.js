const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');

// Crear un nuevo pedido
router.post('/orders', async (req, res) => {
  try {
    const { items, customerInfo, ...orderData } = req.body;
    const order = await Order.create(orderData);
    const orderItems = items.map(item => ({
      ...item,
      order_id: order.id,
    }));
    await OrderItem.bulkCreate(orderItems);
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener todos los pedidos
router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.findAll({ include: OrderItem });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
