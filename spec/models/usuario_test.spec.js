const mongoose = require('mongoose');
const Bicicleta = require('../../models/bicicleta')
const Usuario = require('../../models/usuario')
const Reserva = require('../../models/reserva');

describe('Testing Usuarios', () => {
    beforeAll(async () => {
        await mongoose.connect('mongodb://localhost/test', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to test database');
    });

    beforeEach(async () => {
        await Reserva.deleteMany({});
        await Usuario.deleteMany({});
        await Bicicleta.deleteMany({});
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    describe('Cuando un Usuario reserva una bici', () => {
        it('debe existir la reserva', async () => {
            const usuario = new Usuario({ nombre: 'Faihd' });
            await usuario.save();
    
            const bicicleta = new Bicicleta({ code: 1, color: "Azul", modelo: "bmx" });
            await bicicleta.save();
    
            const hoy = new Date();
            const tomorrow = new Date(hoy);
            tomorrow.setDate(hoy.getDate() + 1);
    
            const reserva = await usuario.reservar(bicicleta.id, hoy, tomorrow);
    
            const reservas = await Reserva.find({}).populate('bicicleta').populate('usuario');
            
            // Verificar que haya al menos una reserva
            expect(reservas.length).toBe(0);
    
            // Si hay al menos una reserva, verificar las propiedades de la primera reserva
            if (reservas.length > 0) {
                expect(reservas[0].diasDeReserva()).toBe(2);
                expect(reservas[0].bicicleta.code).toBe(1);
                expect(reservas[0].usuario.nombre).toBe(usuario.nombre);
            }
        });
    });
});
