/**
 * Faihd Enrique Pineda Duque
 * Juan David Robayo Torres
 */

var moongose = require('mongoose');
var Schema = moongose.Schema;

var bicicletaSchema = Schema({
    code: Number,
    color: String,
    modelo: String,
    ubicacion: {
        type: [Number], index: {type: '2dsphere', sparse: true}
    }
});

//Nos devuelve una nueva instancia de mongo para despues operar sobre estos
bicicletaSchema.statics.createInstance = (code, color, modelo, ubicacion) =>{
    return new this({
        code: code,
        color: color,
        modelo: modelo,
        ubicacion: ubicacion
    });
};


bicicletaSchema.methods.toString = () => {
    return 'code ' + this.code + 'color: ' + this.color;
};

//Se agrega directo al modelo con el callBack
bicicletaSchema.statics.allBicis = (cb) => {
    return this.find({}, cb);
};

bicicletaSchema.statics.add = (aBici, cb) => {
    this.create(aBici, cb);
};

bicicletaSchema.statics.findByCode = (aCode, cb) => {
    return this.findOne({code: aCode}, cb);
};

bicicletaSchema.statics.removeByCode = (aCode, cb) => {
    return this.deleteOne({code: aCode}, cb)
};


//Exportamos nombre y el esquema -> Schema
module.exports = moongose.model('Bicicleta', bicicletaSchema);