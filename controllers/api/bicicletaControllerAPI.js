/**
 * Faihd Enrique Pineda Duque
 * Juan David Robayo Torres
 */

var Bicicleta = require('../../models/bicicleta')

// Controlador para obtener la lista de todas las bicicletas
exports.bicicleta_list = async (req, res) => {
    const bicis = await Bicicleta.find({});
    // Devuelve un objeto JSON con un array de bicicletas
    res.status(200).json(bicis);
}

// Controlador para crear una nueva bicicleta
// Crea una nueva instancia de Bicicleta utilizando los datos enviados en el cuerpo 
//de la solicitud
exports.bicicleta_create = async function(req, res){
    var bici = new Bicicleta({code: req.body.code, color: req.body.color, modelo: req.body.modelo});
    bici.ubicacion = [req.body.lat, req.body.lng];

    // Agrega la bicicleta recién creada al conjunto de bicicletas
    try {
        await Bicicleta.add(bici);
        res.status(200).json(bici);
    } catch (error) {
        res.status(500).json("No se pudo XD")
    }
    // Devuelve un objeto JSON con la bicicleta recién creada
    
}

// Controlador para obtener los detalles de una bicicleta específica
// Busca una bicicleta por su ID y la asigna a la variable 'bici'
exports.bicicleta_show = async (req, res) => {
    const { id } = req.params;

    const result = await Bicicleta.findById(id);

    // Devuelve un objeto JSON con la bicicleta encontrada
    res.status(200).json({
        bicicleta: result
    });
}

/*exports.bicicleta_show_get = async function(req, res) {
    const { id } = req.params;

    const result = await Bicicleta.findById(id);

    if (!result.success) {
        return res.status(404).send(result.message);
    }

    res.render('bicicletas/show', { bici: result.data });
};*/

// Controlador para actualizar los detalles de una bicicleta específica
// Busca una bicicleta por su ID y la asigna a la variable 'bici'
exports.bicicleta_update = async (req, res) => {
    try {
        // Busca la bicicleta por su ID
        const bici = await Bicicleta.findById(req.params.id);

        // Verifica si la bicicleta fue encontrada
        if (!bici) {
            return res.status(404).json({ error: 'Bicicleta no encontrada' });
        }

        // Actualiza los detalles de la bicicleta con los valores enviados en el cuerpo de la solicitud
        bici.color = req.body.color;
        bici.modelo = req.body.modelo;
        bici.ubicacion = [req.body.lat, req.body.lng];

        // Guarda la bicicleta actualizada en la base de datos
        await bici.save();

        // Devuelve un objeto JSON con la bicicleta actualizada
        res.status(200).json({ bicicleta: bici });
    } catch (error) {
        // Si ocurre algún error, devuelve un mensaje de error
        console.error('Error al actualizar bicicleta:', error);
        res.status(500).json({ error: 'Error al actualizar bicicleta' });
    }
};


// Controlador para eliminar una bicicleta específica
// Elimina la bicicleta con el ID especificado en el cuerpo de la solicitud
exports.bicicleta_delete = (req ,res) => {
    Bicicleta.removeByCode(req.body.id);

    // Envía una respuesta con el código de estado 204 (No Content) para indicar
    // que la operación se realizó correctamente pero no hay contenido para devolver
    res.status(204).send();
}
