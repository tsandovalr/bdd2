const express = require('express')
const router = express.Router()

const { 
    renderApuestaForm,
    createNewApuesta,
    renderApuestas,
    renderEditForm,
    uptadeApuesta,
    deleteApuesta } = require('../controllers/apuestas');

    

//new apuestas to add
router.get('/apuestas/add', renderApuestaForm);
router.post('/apuestas/new-apuesta', createNewApuesta);



//get * apuestas
router.get('/apuestas', renderApuestas)




//edit apuestas
router.get('/apuestas/edit', renderEditForm)
router.put('/apuestas/edit',   uptadeApuesta)



//Delete apuestas
router.delete('/apuestas/delete', deleteApuesta)


module.exports = router