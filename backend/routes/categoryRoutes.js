const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

// Crear una nueva categoría
router.post('/categories', async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener todas las categorías
router.get('/categories', async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar una categoría
router.delete('/categories/:id', async (req, res) => {
  try {
    await Category.destroy({ where: { id: req.params.id } });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
