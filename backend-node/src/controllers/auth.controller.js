const User = require('../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// Registro
exports.register = async (req, res) => {
  try {
    const { nombre, email, password } = req.body

    // Comprobar si ya existe
    const exists = await User.findOne({ email })
    if (exists) {
      return res.status(400).json({ message: 'El email ya está registrado' })
    }

    // Encriptar contraseña
    const hash = await bcrypt.hash(password, 10)

    const user = new User({ nombre, email, password: hash })
    await user.save()

    res.status(201).json({ message: 'Usuario registrado correctamente' })
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error })
  }
}

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ message: 'Credenciales incorrectas' })
    }

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      return res.status(401).json({ message: 'Credenciales incorrectas' })
    }

    const token = jwt.sign(
      { id: user._id, rol: user.rol },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    )

    res.json({ token, user: { nombre: user.nombre, email: user.email, rol: user.rol } })
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error })
  }
}