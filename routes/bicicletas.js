var express = require('express');
var router = express.Router();
var bicicletaControlller = require('../controllers/bicicleta.js');

// Define las rutas y sus correspondientes controladores para manejar las solicitudes HTTP

// Ruta para listar todas las bicicletas (GET /)
router.get('/',bicicletaControlller.Bicicleta_list);

// Ruta para mostrar el formulario de creación de una bicicleta (GET /create)
router.get('/create',bicicletaControlller.bicicleta_create_get);

// Ruta para manejar la creación de una bicicleta (POST /create)
router.post('/create',bicicletaControlller.bicicleta_create_post);

// Ruta para mostrar los detalles de una bicicleta específica (GET /:id/show)
router.get('/:id/show',bicicletaControlller.bicicleta_show_get);

// Ruta para mostrar el formulario de actualización de una bicicleta específica (GET /:id/update)
router.get('/:id/update',bicicletaControlller.bicicleta_update_get);

// Ruta para manejar la actualización de una bicicleta específica (POST /:id/update)
router.post('/:id/update',bicicletaControlller.bicicleta_update_post);

// Ruta para manejar la eliminación de una bicicleta específica (POST /:id/delete)
router.post('/:id/delete',bicicletaControlller.bicicleta_delete_post);

module.exports = router;
