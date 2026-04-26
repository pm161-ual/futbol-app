const router = require('express').Router()
const player = require('../controllers/player.controller')
const { verifyToken, verifyAdmin } = require('../middleware/auth.middleware')

/**
 * @swagger
 * /api/players:
 *   get:
 *     summary: Obtener todos los jugadores
 *     tags: [Players]
 *     parameters:
 *       - in: query
 *         name: nombre
 *         schema:
 *           type: string
 *         description: Filtrar por nombre
 *       - in: query
 *         name: equipo
 *         schema:
 *           type: string
 *         description: Filtrar por equipo
 *       - in: query
 *         name: liga
 *         schema:
 *           type: string
 *         description: Filtrar por liga
 *     responses:
 *       200:
 *         description: Lista de jugadores
 */
router.get('/', player.getAll)

/**
 * @swagger
 * /api/players/{id}:
 *   get:
 *     summary: Obtener un jugador por ID
 *     tags: [Players]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Datos del jugador
 *       404:
 *         description: Jugador no encontrado
 */
router.get('/:id', player.getOne)

/**
 * @swagger
 * /api/players/{id}/comments:
 *   post:
 *     summary: Añadir comentario a un jugador
 *     tags: [Players]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Comentario añadido
 *       404:
 *         description: Jugador no encontrado
 */
router.post('/:id/comments', player.addComment)

/**
 * @swagger
 * /api/players:
 *   post:
 *     summary: Crear nuevo jugador
 *     tags: [Players]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Jugador creado
 *       401:
 *         description: Token requerido
 */
router.post('/', verifyToken, player.create)

/**
 * @swagger
 * /api/players/{id}:
 *   put:
 *     summary: Editar jugador (solo admin)
 *     tags: [Players]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Jugador actualizado
 *       403:
 *         description: Acceso solo para administradores
 */
router.put('/:id', verifyToken, verifyAdmin, player.update)

/**
 * @swagger
 * /api/players/{id}:
 *   delete:
 *     summary: Eliminar jugador (solo admin)
 *     tags: [Players]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Jugador eliminado
 *       403:
 *         description: Acceso solo para administradores
 */
router.delete('/:id', verifyToken, verifyAdmin, player.remove)

/**
 * @swagger
 * /api/players/{id}/comments/{commentId}:
 *   delete:
 *     summary: Eliminar comentario (solo admin)
 *     tags: [Players]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Comentario eliminado
 *       403:
 *         description: Acceso solo para administradores
 */
router.delete('/:id/comments/:commentId', verifyToken, verifyAdmin, player.removeComment)

module.exports = router