const mongoose = require('mongoose');
const Bicicleta = require('../../models/bicicleta');

describe('Testing Bicicletas', function() {
    beforeAll(async function() {
        await mongoose.connect('mongodb://localhost/test');
        console.log('We are connected to test database');
    });

    beforeEach(async function() {
        await Bicicleta.deleteMany({});
    });

    afterAll(async function() {
        await mongoose.disconnect();
    });

    describe('Bicicleta.createInstance', () => {
        it('crea una instancia de Bicicleta', () => {
            const bici = Bicicleta.createInstance(1, 'verde', 'urbana', [10.123, -76.123]);

            expect(bici.code).toBe(1);
            expect(bici.color).toBe('verde');
            expect(bici.modelo).toBe('urbana');
            expect(bici.ubicacion[0]).toBe(10.123);
            expect(bici.ubicacion[1]).toBe(-76.123);
        });
    });

    describe('Bicicleta.allBicis', () =>{
        it('Comienza vacia', async () => {
            const bicis = await Bicicleta.allBicis();
            expect(bicis.length).toBe(0);
        });
    });

    describe('Bicicleta.add', () => {
        it('agrega solo una bici', async () => {
            const aBici = new Bicicleta({ code: 1, color: "verde", modelo: "urbana", ubicacion: [10.123, -76.123] });
            await Bicicleta.add(aBici);

            const bicis = await Bicicleta.allBicis();
            expect(bicis.length).toEqual(1);
            expect(bicis[0].code).toEqual(aBici.code);
        });
    });

    describe('Bicicleta.findByCode', () => {
        it('debe devolver la bici con code 1', async () => {
            const bici = await Bicicleta.createInstance(1, 'verde', 'urbana', [10.123, -76.123]);
            await Bicicleta.add(bici);
    
            const foundBici = await Bicicleta.findByCode(1);
            expect(foundBici.code).toBe(1);
            expect(foundBici.color).toBe('verde');
            expect(foundBici.modelo).toBe('urbana');
            expect(foundBici.ubicacion[0]).toBe(10.123);
            expect(foundBici.ubicacion[1]).toBe(-76.123);
        });
    
        it('retorna null si no se encuentra una bicicleta con el código dado', async () => {
            const foundBici = await Bicicleta.findByCode(999); // Código que no existe
            expect(foundBici).toBeNull();
        });
    });

    describe('Bicicleta.removeByCode', () => {
        it('elimina una bicicleta por su código', async () => {
            const bici = await Bicicleta.createInstance(1, 'verde', 'urbana', [10.123, -76.123]);
            await Bicicleta.add(bici);
    
            // Verificar que la bicicleta se agregó correctamente
            const foundBiciBeforeRemoval = await Bicicleta.findByCode(1);
            expect(foundBiciBeforeRemoval).not.toBeNull(); // Verificar que la bicicleta existe antes de eliminarla
    
            // Eliminar la bicicleta
            await Bicicleta.removeByCode(1);
    
            // Verificar que la bicicleta se eliminó correctamente
            const foundBiciAfterRemoval = await Bicicleta.findByCode(1);
            expect(foundBiciAfterRemoval).toBeNull(); // Verificar que la bicicleta ya no existe
        });
    
        it('no hace nada si no se encuentra una bicicleta con el código dado', async () => {
            // Intentar eliminar una bicicleta con un código que no existe
            await Bicicleta.removeByCode(999);
    
            // Verificar que no haya ocurrido ningún error y que no se haya eliminado ninguna bicicleta
            const bicis = await Bicicleta.allBicis();
            expect(bicis.length).toBe(0); // Verificar que no hay bicicletas en la lista
        });
    });
    
    
});
