const Player = require('../models/player.model')

// Obtener todos los jugadores
exports.getAll = async (req, res) => {
  try {
    const { nombre, equipo, liga, desde } = req.query
    const filter = {}

    if (nombre) filter.nombre = { $regex: nombre, $options: 'i' }
    if (equipo) filter.equipo = { $regex: equipo, $options: 'i' }
    if (liga) filter.liga = { $regex: liga, $options: 'i' }
    if (desde) filter.createdAt = { $gte: new Date(desde) }

    const players = await Player.find(filter)
    res.json({ result: players, message: 'OK', code: 200 })
  } catch (error) {
    res.status(500).json({ result: null, message: 'Error en el servidor', code: 500 })
  }
}

// Obtener un jugador por id
exports.getOne = async (req, res) => {
  try {
    const player = await Player.findById(req.params.id)
    if (!player) {
      return res.status(404).json({ result: null, message: 'Jugador no encontrado', code: 404 })
    }
    res.json({ result: player, message: 'OK', code: 200 })
  } catch (error) {
    res.status(500).json({ result: null, message: 'Error en el servidor', code: 500 })
  }
}

// Crear jugador
exports.create = async (req, res) => {
  try {
    const player = new Player(req.body)
    await player.save()
    res.status(201).json({ result: player, message: 'Jugador creado', code: 201 })
  } catch (error) {
    res.status(500).json({ result: null, message: 'Error en el servidor', code: 500 })
  }
}

// Editar jugador (solo admin)
exports.update = async (req, res) => {
  try {
    const player = await Player.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!player) {
      return res.status(404).json({ result: null, message: 'Jugador no encontrado', code: 404 })
    }
    res.json({ result: player, message: 'Jugador actualizado', code: 200 })
  } catch (error) {
    res.status(500).json({ result: null, message: 'Error en el servidor', code: 500 })
  }
}

// Eliminar jugador (solo admin)
exports.remove = async (req, res) => {
  try {
    const player = await Player.findByIdAndDelete(req.params.id)
    if (!player) {
      return res.status(404).json({ result: null, message: 'Jugador no encontrado', code: 404 })
    }
    res.json({ result: player, message: 'Jugador eliminado', code: 200 })
  } catch (error) {
    res.status(500).json({ result: null, message: 'Error en el servidor', code: 500 })
  }
}

// Añadir comentario a un jugador
exports.addComment = async (req, res) => {
  try {
    const player = await Player.findById(req.params.id)
    if (!player) {
      return res.status(404).json({ result: null, message: 'Jugador no encontrado', code: 404 })
    }
    player.comentarios.push(req.body)
    await player.save()
    res.status(201).json({ result: player, message: 'Comentario añadido', code: 201 })
  } catch (error) {
    res.status(500).json({ result: null, message: 'Error en el servidor', code: 500 })
  }
}

// Eliminar comentario (solo admin)
exports.removeComment = async (req, res) => {
  try {
    const player = await Player.findById(req.params.id)
    if (!player) {
      return res.status(404).json({ result: null, message: 'Jugador no encontrado', code: 404 })
    }
    player.comentarios = player.comentarios.filter(
      c => c._id.toString() !== req.params.commentId
    )
    await player.save()
    res.json({ result: player, message: 'Comentario eliminado', code: 200 })
  } catch (error) {
    res.status(500).json({ result: null, message: 'Error en el servidor', code: 500 })
  }
}