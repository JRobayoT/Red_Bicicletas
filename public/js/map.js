/**
 * Faihd Enrique Pineda Duque
 * Juan David Robayo Torres
 */

var map = L.map('main_map').setView([4.579700870810789, -74.15751070350747], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var marker = L.marker([4.582385205659256, -74.15670604077965]).addTo(map);
var marker = L.marker([4.583575194806388, -74.15610752121424]).addTo(map);
//Metodo ajax para representar los marcadores, de los datos obtenidos de la API
//Si la funcion lo encuentra (success), registra los marcadores en el mapa
$.ajax({
    dataType: "json",
    url: "api/bicicletas",
    success: function(result){
        console.log(result);
        result.bicicletas.forEach(function(bici){
            L.marker(bici.ubicacion).addTo(map);
        });
    }
})