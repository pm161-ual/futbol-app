const router = require('express').Router()
const player = require('../controllers/player.controller')
const { verifyToken, verifyAdmin } = require('../middleware/auth.middleware')

// Rutas públicas (sin login)
router.get('/', player.getAll)
router.get('/:id', player.getOne)
router.post('/:id/comments', player.addComment)

// Rutas para usuarios registrados
router.post('/', verifyToken, player.create)

// Rutas solo admin
router.put('/:id', verifyToken, verifyAdmin, player.update)
router.delete('/:id', verifyToken, verifyAdmin, player.remove)
router.delete('/:id/comments/:commentId', verifyToken, verifyAdmin, player.removeComment)

module.exports = router