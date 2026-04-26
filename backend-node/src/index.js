const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')
const swaggerSpec = require('./swagger')
require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.json())

// Swagger
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.log('Error MongoDB:', err))

// Rutas
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/players', require('./routes/player.routes'))
app.use('/api/external', require('./routes/external.routes'))

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: 'Backend Node OK', code: 200 })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`)
})

module.exports = app