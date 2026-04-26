const router = require('express').Router()
const external = require('../controllers/external.controller')
const { verifyToken } = require('../middleware/auth.middleware')

/**
 * @swagger
 * /api/external/search:
 *   get:
 *     summary: Buscar jugadores en API-Football
 *     tags: [External]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: nombre
 *         required: true
 *         schema:
 *           type: string
 *         description: Nombre del jugador
 *       - in: query
 *         name: league
 *         schema:
 *           type: number
 *         description: ID de la liga (140 = La Liga)
 *     responses:
 *       200:
 *         description: Lista de jugadores encontrados
 *       401:
 *         description: Token requerido
 */
router.get('/search', verifyToken, external.searchPlayers)

/**
 * @swagger
 * /api/external/import:
 *   post:
 *     summary: Importar jugadores a la base de datos local
 *     tags: [External]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               jugadores:
 *                 type: array
 *               geolocalizacion:
 *                 type: object
 *                 properties:
 *                   latitud:
 *                     type: number
 *                   longitud:
 *                     type: number
 *     responses:
 *       201:
 *         description: Jugadores importados correctamente
 *       401:
 *         description: Token requerido
 */
router.post('/import', verifyToken, external.importPlayer)

module.exports = router