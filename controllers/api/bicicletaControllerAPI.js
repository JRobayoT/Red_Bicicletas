var Bicicleta = require('../../models/bicicleta')

// Controlador para obtener la lista de todas las bicicletas
exports.bicicleta_list = (req, res) => {
    // Devuelve un objeto JSON con un array de bicicletas
    res.status(200).json({
        bicicletas: Bicicleta.allBicis
    });
}

// Controlador para crear una nueva bicicleta
// Crea una nueva instancia de Bicicleta utilizando los datos enviados en el cuerpo 
//de la solicitud
exports.bicicleta_create = (req, res) => {
    var bici = new Bicicleta(req.body.id, req.body.color, req.body.modelo);
    bici.ubicacion = [req.body.lat, req.body.lng];

    // Agrega la bicicleta recién creada al conjunto de bicicletas
    Bicicleta.add(bici);

    // Devuelve un objeto JSON con la bicicleta recién creada
    res.status(200).json({
        bicicleta: bici
    });
}

// Controlador para obtener los detalles de una bicicleta específica
// Busca una bicicleta por su ID y la asigna a la variable 'bici'
exports.bicicleta_show = (req, res) => {
    var bici = Bicicleta.findById(req.params.id);

    // Devuelve un objeto JSON con la bicicleta encontrada
    res.status(200).json({
        bicicleta: bici
    });
}

// Controlador para actualizar los detalles de una bicicleta específica
// Busca una bicicleta por su ID y la asigna a la variable 'bici'
exports.bicicleta_update = (req, res) => {
    var bici = Bicicleta.findById(req.body.id);

    // Actualiza los detalles de la bicicleta con los valores enviados en el cuerpo 
    //de la solicitud
    bici.color = req.body.color;
    bici.modelo = req.body.modelo;
    bici.ubicacion = [req.body.lat, req.body.lng];

    // Devuelve un objeto JSON con la bicicleta actualizada
    res.status(200).json({
        bicicleta: bici
    });
}

// Controlador para eliminar una bicicleta específica
// Elimina la bicicleta con el ID especificado en el cuerpo de la solicitud
exports.bicicleta_delete = (req ,res) => {
    Bicicleta.removeById(req.body.id);

    // Envía una respuesta con el código de estado 204 (No Content) para indicar
    // que la operación se realizó correctamente pero no hay contenido para devolver
    res.status(204).send();
}
