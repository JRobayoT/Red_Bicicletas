var map = L.map('main_map').setView([4.579700870810789, -74.15751070350747], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

//Marcadores
var marker = L.marker([4.579700870810789, -74.15751070350747]).addTo(map);