const express = require('express')
const router = express.Router()

const { renderPartidos } = require('../controllers/partidos');

    


//get * apuestas
router.get('/partidos', renderPartidos)




module.exports = router