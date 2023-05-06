// СТВОРЮЄ РОЗМІТКУ КАРТКИ ОГОЛОШЕННЯ НА ОСНОВІ ОБ'ЄКТУ ДАНИХ
export default function createCard (data) {
    const { author, offer } = data;

    // Створює popup з інформацією про житло
    const card = `<article class="popup">
    <img src="http://localhost:3000/${author.avatar}" class="popup__avatar" width="70" height="70" alt="Аватар юзера" />
    <h3 class="popup__title">${offer.title}</h3>
    <p class="popup__text popup__text--address">${offer.address}</p>
    <p class="popup__text popup__text--price">${offer.price} <span>грн/ніч</span></p>
    <h4 class="popup__type">${getType()}</h4>
    <p class="popup__text popup__text--capacity">${offer.rooms} ${getRoomWord()} для ${offer.guests} ${offer.guests === 1 ? 'гостя' : 'гостей'}</p>
    <p class="popup__text popup__text--time">Заїзд після ${offer.checkin}, виїзд до ${offer.checkout}</p>
    ${ getFeatures() }
    ${ getDescription() }
    ${ getPhoto() }
    </article>`;

    // Визначає відмінок слова "кімната"  у popup залежно від кількості кімнат (опрацьовано до 9 кімнат)
    function getRoomWord() {
        switch (offer.rooms) {
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
        switch (offer.type) {
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
        if(offer.description) {
            return `<p class="popup__description">${offer.description}</p>`;
        } else {
            return '';
        };
    };

    // Якщо присутні зручності у помешканні - додає їх у розмітку
    function getFeatures () {
        if(offer.features && offer.features.length !== 0) {
            return `<ul class="popup__features">
                        ${offer.features.map(feature => `<li class="popup__feature popup__feature--${feature}"></li>`).join('')}
                    </ul>`;
        } else {
            return '';
        };
    };

    // Якщо присутні фото помешкання - додає їх у розмітку
    function getPhoto () {
        if(offer.photos && offer.photos.length !== 0) {
            return `<div class="popup__photos">
                        ${offer.photos.map(photo => {
                            return `<img src="http://localhost:3000/${photo}" class="popup__photo" width="45" height="40" alt="Фотографія житла">`;
                        }).join('')} 
                    </div>`;
        } else {
            return '';
        };
    };        
    
    return card;
};