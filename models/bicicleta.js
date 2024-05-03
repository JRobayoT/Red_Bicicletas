//Constructor para las bicicletas
var Bicicleta = function(id, color, modelo, ubicacion){
    this.id = id,
    this.color = color,
    this.modelo = modelo,
    this.ubicacion = ubicacion
}

//Prototipos
Bicicleta.prototype.toString = function () {
    return 'id: ' + this.id + "| color: " + this.color;
}

//array para bicicletas
Bicicleta.allBicis = [];

//Funcion para agregar bicicletas
Bicicleta.add = (aBici) =>{
    Bicicleta.allBicis.push(aBici);
}

//Funcion para buscar una bicicleta por ID
Bicicleta.findById = (aBiciID) =>{
    var aBici = Bicicleta.allBicis.find(x => x.id == aBiciID);
    if (aBici) {
        return aBici;
    } else {
        throw new Error(`No existe una bicicleta con el Id ${aBiciID}`)
    }
}

//Funcion para quitar bicicletas
Bicicleta.removeById = (aBiciID) =>{
    //Bicicleta.findById(aBiciID);
    for (let i = 0; i < Bicicleta.allBicis.length; i++) {
        if(Bicicleta.allBicis[i].id == aBiciID){
            Bicicleta.allBicis.splice(i, 1);
            break
        }
    }
}

//Datos de prueba para bicicleta
var a = new Bicicleta(1,'azul','mtb', [4.582385205659256, -74.15670604077965]);
var b = new Bicicleta(2,'blanca','mtb', [4.583575194806388, -74.15610752121424]);

//Añade los datos de prueba
Bicicleta.add(a);
Bicicleta.add(b);

module.exports = Bicicleta;