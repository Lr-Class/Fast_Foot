const express = require('express');
const cors = require('cors'); // Añadir esto
const app = express();
const sequelize = require('./config/database');
const productoRoutes = require('./routes/productoRoutes');
const pedidoRoutes = require('./routes/orderRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const userRoutes = require('./routes/userRoutes'); // Si tienes autenticación

app.use(cors({
  origin: 'http://localhost:5173' // Reemplazar con la URL de tu frontend
}));

app.use(express.json());
app.use('/api', productoRoutes);
app.use('/api', pedidoRoutes);
app.use('/api', categoryRoutes);
app.use('/api', userRoutes); // Si tienes autenticación

app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});

sequelize.sync()
  .then(() => console.log('Base de datos sincronizada'))
  .catch(error => console.log('Error al sincronizar la base de datos:', error));
