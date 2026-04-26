const axios = require('axios')
const Player = require('../models/player.model')

// Buscar jugadores en API-Football
exports.searchPlayers = async (req, res) => {
  try {
    const { nombre } = req.query

    const response = await axios.get('https://v3.football.api-sports.io/players', {
    headers: {
        'x-apisports-key': process.env.API_FOOTBALL_KEY
    },
    params: {
        search: nombre,
        league: req.query.league || 140, // 140 = La Liga por defecto
        season: 2023
    }
})

    console.log('Respuesta API:', JSON.stringify(response.data, null, 2))

    const players = response.data.response.map(item => ({
    apiId: item.player.id,
    nombre: item.player.name,
    edad: item.player.age,
    nacionalidad: item.player.nationality,
    imagen: item.player.photo,
    equipo: item.statistics[0]?.team?.name || '',
    liga: item.statistics[0]?.league?.name || '',
    posicion: item.statistics[0]?.games?.position || ''
    }))

    res.json({ result: players, message: 'OK', code: 200 })
  } catch (error) {
    res.status(500).json({ result: null, message: 'Error buscando jugadores', code: 500 })
  }
}

// Importar jugador seleccionado a la base de datos local
exports.importPlayer = async (req, res) => {
  try {
    const { jugadores, geolocalizacion } = req.body

    // jugadores es un array de jugadores seleccionados
    const saved = []
    for (const jugador of jugadores) {
      const exists = await Player.findOne({ apiId: jugador.apiId })
      if (!exists) {
        const player = new Player({ ...jugador, geolocalizacion })
        await player.save()
        saved.push(player)
      }
    }

    res.status(201).json({ 
      result: saved, 
      message: `${saved.length} jugador(es) importado(s)`, 
      code: 201 
    })
  } catch (error) {
    res.status(500).json({ result: null, message: 'Error importando jugadores', code: 500 })
  }
}