const router = require('express').Router()
const external = require('../controllers/external.controller')
const { verifyToken } = require('../middleware/auth.middleware')

// Solo usuarios registrados pueden buscar e importar
router.get('/search', verifyToken, external.searchPlayers)
router.post('/import', verifyToken, external.importPlayer)

module.exports = router