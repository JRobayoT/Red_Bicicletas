var express = require('express');
var router = express.Router();
var bicicletaControlller = require('../controllers/bicicleta.js');

router.get('/',bicicletaControlller.Bicicleta_list);
router.get('/create',bicicletaControlller.bicicleta_create_get);
router.post('/create',bicicletaControlller.bicicleta_create_post);
router.get('/:id/show',bicicletaControlller.bicicleta_show_get);
router.get('/:id/update',bicicletaControlller.bicicleta_update_get);
router.post('/:id/update',bicicletaControlller.bicicleta_update_post);
router.post('/:id/delete',bicicletaControlller.bicicleta_delete_post);

module.exports = router;