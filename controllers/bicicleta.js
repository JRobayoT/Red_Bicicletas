/**
 * Faihd Enrique Pineda Duque
 * Juan David Robayo Torres
 */

var Bicicleta = require('../models/bicicleta')

// Controlador para mostrar una lista de bicicletas
exports.Bicicleta_list = async (req, res) => {
    try {
        const bicis = await Bicicleta.allBicis();
        // Renderiza la vista 'bicicletas/index' y pasa el array de bicicletas 'allBicis' como contexto
        res.render('bicicletas/index',{bicis})
    } catch (error) {
        console.error('Error al obtener la lista de bicicletas:', error);
        res.status(500).send('Error al obtener la lista de bicicletas');
    }
    
}

// Controlador para mostrar el formulario de creación de una nueva bicicleta (GET)
exports.bicicleta_create_get = (req, res) => {
    // Renderiza la vista 'bicicletas/create'
    res.render('bicicletas/create');
}

// Controlador para manejar la creación de una nueva bicicleta (POST)
exports.bicicleta_create_post = (req, res) => {
    // Crea una nueva instancia de Bicicleta utilizando los datos enviados en el cuerpo de la solicitud
    var bici = new Bicicleta({code: req.body.code, color: req.body.color, modelo: req.body.modelo}); 

    // Establece la ubicación de la bicicleta utilizando los datos de latitud y longitud enviados en el cuerpo de la solicitud
    bici.ubicacion = [req.body.lat, req.body.lng];

    // Agrega la bicicleta recién creada al conjunto de bicicletas
    Bicicleta.add(bici);

    res.redirect('/bicicletas')
}

// Controlador para mostrar los detalles de una bicicleta específica (GET)
exports.bicicleta_show_get = async (req, res) =>{
    const { id } = req.params;

    const result = await Bicicleta.findById(id);

    if (!result.success) {
        return res.status(404).send(result.message);
    }

    res.render('bicicletas/show', { bici: result.data });
};

// Controlador para mostrar el formulario de actualización de una bicicleta específica (GET)
// Busca una bicicleta por su ID y la asigna a la variable 'bici'
exports.bicicleta_update_get = async function(req, res){
    const { id } = req.params;

    const result = await Bicicleta.findById(id);
    if (!result.success) {
        return res.status(404).send(result.message);
    }
    // Renderiza la vista 'bicicletas/update' y pasa la bicicleta encontrada como contexto
    res.render('bicicletas/update', {bici: result.data});
}

// Controlador para manejar la actualización de una bicicleta específica (POST)
exports.bicicleta_update_post = async (req, res) => {
    const { id } = req.params;

    try {
        // Actualiza los datos de la bicicleta y devuelve el documento actualizado
        const bici = await Bicicleta.findByIdAndUpdate(
            id,
            {
                code: req.body.code,
                color: req.body.color,
                modelo: req.body.modelo,
                ubicacion: [req.body.lat, req.body.lng]
            },
            { new: true, runValidators: true }
        );

        if (!bici) {
            return res.status(404).send('Bicicleta no encontrada');
        }

        res.redirect('/bicicletas');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error actualizando la bicicleta');
    }
};

// Controlador para manejar la eliminación de una bicicleta específica (POST)
//Elimina la bicicleta con el ID especificado en el cuerpo de la solicitud
exports.bicicleta_delete_post = (req, res) => {
    //var bici = Bicicleta.findById(req.params.id)
    console.log(req.params.id)
    Bicicleta.removeByCode(req.params.id);

    res.redirect('/bicicletas');
}
