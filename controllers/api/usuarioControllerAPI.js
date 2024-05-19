var Usuario = require('../../models/usuario');

exports.usuarios_list = async function(req, res){
    try {
        const usuarios = await Usuario.find({});
        res.status(200).json(usuarios);
      } catch (err) {
        res.status(500).send('Error al obtener usuarios:', err);
      }
};

exports.usuarios_create = async function(req, res){
    var usuario = new Usuario({nombre: req.body.nombre});

    try {
        await usuario.save();
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json(err);
    }
    
};

exports.usuarios_reservar = function(req, res){
    Usuario.findById(req.body.id, function(err, usuario){
        console.log(usuario);
        usuario.reservar(req.body.bici_id, req.body.desde, req.body.hasta, (err) =>{
            console.log('reserva !!!');
            res.status(200).send();
        });
    });
};