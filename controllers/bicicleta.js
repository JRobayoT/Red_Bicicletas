var Bicicleta = require('../models/bicicleta.js')

// Controlador para mostrar una lista de bicicletas
exports.Bicicleta_list = (req, res) =>{

    // Renderiza la vista 'bicicletas/index' y pasa el array de bicicletas 'allBicis' como contexto
    res.render('bicicletas/index',{bicis: Bicicleta.allBicis})
}

// Controlador para mostrar el formulario de creación de una nueva bicicleta (GET)
exports.bicicleta_create_get = (req, res) => {
    // Renderiza la vista 'bicicletas/create'
    res.render('bicicletas/create');
}

// Controlador para manejar la creación de una nueva bicicleta (POST)
exports.bicicleta_create_post = (req, res) => {
    // Crea una nueva instancia de Bicicleta utilizando los datos enviados en el cuerpo de la solicitud
    var bici = new Bicicleta(req.body.id, req.body.color, req.body.modelo);

    // Establece la ubicación de la bicicleta utilizando los datos de latitud y longitud enviados en el cuerpo de la solicitud
    bici.ubicacion = [req.body.lat, req.body.lng];

    // Agrega la bicicleta recién creada al conjunto de bicicletas
    Bicicleta.add(bici);

    res.redirect('/bicicletas')
}

// Controlador para mostrar los detalles de una bicicleta específica (GET)
exports.bicicleta_show_get = (req, res) => {

    // Busca una bicicleta por su ID y la asigna a la variable 'bici'
    var bici = Bicicleta.findById(req.params.id)

    // Renderiza la vista 'bicicletas/show' y pasa la bicicleta encontrada como contexto
    res.render('bicicletas/show',{bici});
}

// Controlador para mostrar el formulario de actualización de una bicicleta específica (GET)
// Busca una bicicleta por su ID y la asigna a la variable 'bici'
exports.bicicleta_update_get = (req, res) => {
    var bici = Bicicleta.findById(req.params.id)

    // Renderiza la vista 'bicicletas/update' y pasa la bicicleta encontrada como contexto
    res.render('bicicletas/update', {bici});
}

// Controlador para manejar la actualización de una bicicleta específica (POST)
exports.bicicleta_update_post = (req, res) => {
    // Busca una bicicleta por su ID y la asigna a la variable 'bici'
    var bici = Bicicleta.findById(req.params.id)

    // Actualiza los datos de la bicicleta con los valores enviados en el cuerpo de la solicitud
    bici.id = req.body.id;
    bici.color = req.body.color;
    bici.modelo = req.body.modelo;
    bici.ubicacion = [req.body.lat, req.body.lng];

    res.redirect('/bicicletas')
}

// Controlador para manejar la eliminación de una bicicleta específica (POST)
//Elimina la bicicleta con el ID especificado en el cuerpo de la solicitud
exports.bicicleta_delete_post = (req, res) => {
    Bicicleta.removeById(req.body.id);

    res.redirect('/bicicletas');
}
