export default function getMap () {

    const mapContainer = document.querySelector('.map');
    
    // Ініціалізовує інтерактивну карту (бібліотека Leaflet)
    var map = L.map(mapContainer, {
        center: [35.685169, 139.752807],
        zoom: 13
    });
    
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    var mainIcon = L.icon({
        iconUrl: '../img/main-pin.svg',
        iconSize:     [38, 95], 
        iconAnchor:   [22, 94], 
        popupAnchor:  [-3, -70] 
    });

    const marker = L.marker([35.685169, 139.752807], {draggable: true, icon: mainIcon}).addTo(map)
        .bindPopup('Токіо, Японія')
        .openPopup();

    // Реагує на кліки по карті, обрані координати записує у поле Адреса(координати)
    const address = document.getElementById('address');

    function onMapClick(e) {
        const {lat, lng} = e.latlng;
        marker.setLatLng({lat: lat.toFixed(5), lng: lng.toFixed(5)});
        address.setAttribute('value', `${lat.toFixed(5)}, ${lng.toFixed(5)}`);
    };
    
    // Реагує на пересування маркера по карті, обрані координати записує у поле Адреса(координати)
    function onDrag (e) {
        const {lat, lng} = e.target._latlng;
        marker.setLatLng({lat: lat.toFixed(5), lng: lng.toFixed(5)});
        address.setAttribute('value', `${lat.toFixed(5)}, ${lng.toFixed(5)}`);
    }
    
    map.on('click', onMapClick);
    marker.on('moveend', onDrag);

    // Повертає дефолтне положення маркеру та карти при кліку на кнопку "очистити" чи сабміт форми
    function getDefaultMap () {
        marker.setLatLng({lat: 35.685169, lng: 139.752807});
        address.setAttribute('value', '35.685169, 139.752807');
    };


    return {
        getDefaultMap,
        map
    };
};

