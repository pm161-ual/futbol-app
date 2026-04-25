const mongoose = require('mongoose')

// Esquema anidado de comentarios
const commentSchema = new mongoose.Schema({
  autor: {
    type: String,
    required: true
  },
  comentario: {
    type: String,
    required: true,
    maxlength: 1000
  },
  valoracion: {
    type: Number,
    min: 0,
    max: 5,
    required: true
  },
  geolocalizacion: {
    latitud: { type: Number },
    longitud: { type: Number }
  }
}, { timestamps: true })

// Esquema principal de jugador
const playerSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  equipo: {
    type: String,
    required: true
  },
  liga: {
    type: String,
    required: true
  },
  posicion: {
    type: String
  },
  edad: {
    type: Number
  },
  nacionalidad: {
    type: String
  },
  imagen: {
    type: String  // URL de la imagen
  },
  geolocalizacion: {
    latitud: { type: Number },
    longitud: { type: Number }
  },
  // Comentarios anidados dentro del jugador
  comentarios: [commentSchema]
}, { timestamps: true }) // createdAt = fecha de alta en el sistema

module.exports = mongoose.model('Player', playerSchema)