import getData from "./getData.js";

export default async function getDataOnMap(map) {

    // Генерує масив оголошень
    const data = await getData();

    let markers = [];
    // Додає мітки розташування житла з кожного огоошення
    data.map((el, index) => {

        // Координати розташування нової мітки з житлом на карті
        const { x, y } = el.location;

        // Створює popup з інформацією про житло
        const card = `<article class="popup">
            <img src=${el.author.avatar} class="popup__avatar" width="70" height="70" alt="Аватар юзера" />
            <h3 class="popup__title">${el.offer.title}</h3>
            <p class="popup__text popup__text--address">${el.offer.address}</p>
            <p class="popup__text popup__text--price">${el.offer.price} <span>грн/ніч</span></p>
            <h4 class="popup__type">${getType()}</h4>
            <p class="popup__text popup__text--capacity">${el.offer.rooms} ${getRoomWord()} для ${el.offer.guests} ${el.offer.guests === 1 ? 'гостя' : 'гостей'}</p>
            <p class="popup__text popup__text--time">Заїзд після ${el.offer.checkin}, виїзд до ${el.offer.checkout}</p>
            ${ getFeatures() }
            ${ getDescription() }
            ${ getPhoto() }
        </article>`;
            
        // Створює нову мітку житла на карті і прикріплює до неї popup з інформацією про житло
        let newMarker;
        if(index < 10) {
            newMarker = L.marker([x, y]).addTo(map).bindPopup(card);
        } else {
            newMarker = L.marker([x, y]).bindPopup(card);
        };

        el.marker = newMarker;
        markers.push(newMarker);

        // Визначає відмінок слова "кімната"  у popup залежно від кількості кімнат (опрацьовано до 9 кімнат)
        function getRoomWord() {
            switch (el.offer.rooms) {
                case 1:
                    return 'кімната';
                    break;
                case 5 || 6 || 7 || 8 || 9:
                    return 'кімнат';
                    break;
                default:
                    return 'кімнати';
                    break;
            };
        };

        // Визначає тип житла у popup
        function getType() {
            let type;
            switch (el.offer.type) {
                case 'bungalow':
                    type = 'Бунгало';
                    break;
                case 'flat':
                    type = 'Квартира';
                    break;
                case 'house':
                    type = 'Дім';
                    break;
                case 'palace':
                    type = 'Палац';
                    break;
                default: break;
            };
            return type;
        };

        // Якщо присутній опис помешкання - додає його у розмітку
        function getDescription () {
            if(el.offer.description) {
                return `<p class="popup__description">${el.offer.description}</p>`;
            } else {
                return '';
            };
        };

        // Якщо присутні зручності у помешканні - додає їх у розмітку
        function getFeatures () {
            if(el.offer.features && el.offer.features.length !== 0) {
                return `<ul class="popup__features">
                            ${el.offer.features.map(feature => `<li class="popup__feature popup__feature--${feature}"></li>`).join('')}
                        </ul>`;
            } else {
                return '';
            };
        };

        // Якщо присутні фото помешкання - додає їх у розмітку
        function getPhoto () {
            if(el.offer.photos && el.offer.photos.length !== 0) {
                return `<div class="popup__photos">
                            ${el.offer.photos.map(photo => {
                                return `<img src=${photo} class="popup__photo" width="45" height="40" alt="Фотографія житла">`;
                            }).join('')} 
                        </div>`;
            } else {
                return '';
            };
        };        

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