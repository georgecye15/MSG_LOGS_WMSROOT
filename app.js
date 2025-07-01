const express = require('express');
const morgan = require('morgan');

require('dotenv').config();

const logRoutes = require('./routes/logs'); // 👈 importante
//const alertRoutes = require('./routes/alertas'); // opcional por ahora
const alertasRoutes = require('./routes/alertas');


const app = express();
app.use(express.json());
app.use(morgan('dev'));

app.use('/logs', logRoutes); // 👈 esto expone el endpoint
app.use('/alertas', alertasRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en el puerto ${PORT}`);
});
