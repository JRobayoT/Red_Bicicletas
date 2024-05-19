/**
 * Faihd Enrique Pineda Duque
 * Juan David Robayo Torres
 */

const moongose = require('mongoose');
const Schema = moongose.Schema;

var bicicletaSchema = new Schema({
    code: Number,
    color: String,
    modelo: String,
    ubicacion: {
        type: [Number], index: {type: '2dsphere', sparse: true}
    }
});

//Nos devuelve una nueva instancia de mongo para despues operar sobre estos
bicicletaSchema.statics.createInstance = function(code, color, modelo, ubicacion){
    return new this({
        code: code,
        color: color,
        modelo: modelo,
        ubicacion: ubicacion
    });
};


bicicletaSchema.methods.toString = function(){
    return 'code ' + this.code + 'color: ' + this.color;
};

bicicletaSchema.statics.allBicis = function(cb){
    return this.find({}, cb);
};

bicicletaSchema.statics.add = function(aBici){
    return this.create(aBici);
};

bicicletaSchema.statics.findById = async function(id) {
    try {
        const bicicleta = await this.findOne({ _id: id });
        if (!bicicleta) {
            return { success: false, message: 'Bicicleta no encontrada' };
        }
        return { success: true, data: bicicleta };
    } catch (error) {
        return { success: false, message: error.message };
    }
};

bicicletaSchema.statics.findByCode = async function(aCode) {
    return this.findOne({code: aCode})
};

bicicletaSchema.statics.findByIdAndUpdate = async function(id, newData) {
    try {
        const bicicleta = await this.findOneAndUpdate({ _id: id }, newData, { new: true, runValidators: true });
        if (!bicicleta) {
            return { success: false, message: 'Bicicleta no encontrada' };
        }
        return { success: true, data: bicicleta };
    } catch (error) {
        return { success: false, message: error.message };
    }
};

bicicletaSchema.statics.removeByCode = async function(id) {
    try { 
        await this.deleteOne({ _id: id});
    } catch (error) {
        return { success: false, message: error.message };
    }
};


//Exportamos nombre y el esquema -> Schema
module.exports = moongose.model('Bicicleta', bicicletaSchema);