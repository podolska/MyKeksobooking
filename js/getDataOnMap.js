import createCard from "./createCard.js";

export default async function getDataOnMap(map, data) {

    let markers = [];
    // Додає мітки розташування житла з кожного огоошення
    data.map((el, index) => {

        // Координати розташування нової мітки з житлом на карті
        const { x, y } = el.location;

        const card = createCard(el);

        // Створює нову мітку житла на карті і прикріплює до неї popup з інформацією про житло
        let newMarker;

        var regularIcon = L.icon({
            iconUrl: '../img/pin.svg',
            iconSize:     [30, 95], 
            iconAnchor:   [22, 94], 
            popupAnchor:  [-6, -65] 
        });
    
        if(index < 10) {
            newMarker = L.marker([x, y], {icon: regularIcon}).addTo(map).bindPopup(card);
        } else {
            newMarker = L.marker([x, y], {icon: regularIcon}).bindPopup(card);
        };

        el.marker = newMarker;
        markers.push(newMarker);

    });

    // Активує фільтри
    const formFilters = document.querySelector('.map__filters');

    formFilters.classList.remove('map__filters--disabled');
    Array.from(formFilters.children).map(el => el.removeAttribute('disabled'));
    
    document.querySelector('.map__filters-container').style.zIndex = '9999';

    // Налаштовує фільтри
    const filterContainer = document.querySelector('.map__filters');

    // При фільтруванні запобігає зміщенню головного маркера на карті
    filterContainer.addEventListener('click', (e) => e.stopPropagation(), true);

    filterContainer.addEventListener('change', _.throttle(((e) => {
        
        // Видаляє усі маркери на карті 
        markers.map(el => el.remove());
        markers = [];

        const form = e.target.form.elements;

        let filteredData = [];

        // Фільтрує оголошення по типу
        switch(form[name="housing-type"].value) {
            case 'any':
                filteredData = data;
                break;
            default:
                filteredData = data.filter(el => el.offer.type === form[name="housing-type"].value);
                break;
        };       

        // Фільтрує оголошення по ціні
        switch(form[name="housing-price"].value) {
            case 'low':
                filteredData = filteredData.filter(el => el.offer.price < 10000);
                break;
            case 'middle':
                filteredData = filteredData.filter(el => el.offer.price >= 10000 && el.offer.price < 50000);
                break;
            case 'high':
                filteredData = filteredData.filter(el => el.offer.price > 50000);
                break;
            default:
                break;
        };       

        // Фільтрує оголошення по кількості кімнат
        switch(form[name="housing-rooms"].value) {
            case '1':
                filteredData = filteredData.filter(el => el.offer.rooms === 1);
                break;
            case '2':
                filteredData = filteredData.filter(el => el.offer.rooms === 2);
                break;
            case '3':
                filteredData = filteredData.filter(el => el.offer.rooms === 3);
                break;
            default:
                break;
        };   

        // Фільтрує оголошення по кількості гостей
        switch(form[name="housing-guests"].value) {
            case '0':
                filteredData = filteredData.filter(el => el.offer.guests === 0);
                break;
            case '1':
                filteredData = filteredData.filter(el => el.offer.rooms === 1);
                break;
            case '2':
                filteredData = filteredData.filter(el => el.offer.rooms === 2);
                break;
            default:
                break;
        };       

        // Фільтрує оголошення по обраним зручностям
        const featureInputs = form[name="features"];
        const checkedInputs = [...featureInputs].filter(input => input.checked === true);
        checkedInputs.map(input => {
            filteredData = filteredData.filter(el => el.offer.features.includes(input.value));
        });

        // Відбирає перші 10 результатів з масиву відфільтрованих оолошень
        filteredData.map((el, index) => {
            if(index < 10) {
                markers.push(el.marker);
                el.marker.addTo(map);    
            } else {
                return;
            };
        });
            
    }), 500));
};