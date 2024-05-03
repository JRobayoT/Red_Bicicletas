/**
 * Faihd Enrique Pineda Duque
 * Juan David Robayo Torres
 */

var express = require('express');
var router = express.Router();
var bicicletaControlller = require('../../controllers/api/bicicletaControllerAPI');

// Define las rutas y sus correspondientes controladores para manejar las solicitudes HTTP de la API

// Ruta para obtener la lista de todas las bicicletas (GET /)
router.get('/', bicicletaControlller.bicicleta_list);

// Ruta para obtener la informacion de una bicicleta por id (GET /:id)
router.get('/:id',bicicletaControlller.bicicleta_show);

// Ruta para crear una nueva bicicleta (POST /create)
router.post('/create', bicicletaControlller.bicicleta_create);

router.put('/update/:id',bicicletaControlller.bicicleta_update);

// Ruta para eliminar una bicicleta (DELETE /delete)
router.delete('/delete', bicicletaControlller.bicicleta_delete);

module.exports = router;