const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Crear un nuevo producto
router.post('/productos', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener todos los productos
router.get('/productos', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar un producto
router.put('/productos/:id', async (req, res) => {
  try {
    const [updated] = await Product.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedProduct = await Product.findOne({ where: { id: req.params.id } });
      res.json(updatedProduct);
    } else {
      throw new Error('Product not found');
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar un producto
router.delete('/productos/:id', async (req, res) => {
  try {
    await Product.destroy({ where: { id: req.params.id } });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
