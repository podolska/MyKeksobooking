export default function checkInputs () {

    let minimalPrice = 5000;

    function showValidityError (e, title, color='0 0 2px 2px #ff6547') {
        e.target.style.boxShadow = color;
        e.target.setCustomValidity(title);
    }; 

    // Заголовок оголошення
    const title = document.getElementById('title');

    title.setAttribute('required', '');

    title.addEventListener('input', (e) => {
        if(e.target.value === "") {
            e.target.style.boxShadow = 'none';
        } else if(e.target.value.length < 30 ) {
            showValidityError(e, 'Заголовок повинен містити мінімум 30 символів');
        } else if(e.target.value.length > 100) {
            showValidityError(e, 'Заголовок повинен містити максимум 100 символів');
        } else if(e.target.value === '') {
            e.target.style.boxShadow = 'none';
        } else {
            showValidityError(e, '', 'none');
        };
        e.target.reportValidity();
    });

    // Ціна за ніч
    const price = document.getElementById('price');

    price.setAttribute('required', '');

    price.addEventListener('input', (e) => {
        
        if(e.target.value === "") {
            e.target.style.boxShadow = 'none';
        } else if(e.target.value < minimalPrice) {
            showValidityError(e, `Мінімальна вартість - ${minimalPrice}`);
        } else if(e.target.value > 1000000) {
            showValidityError(e, 'Максимальна вартість - 1 000 000');
        } else {
            showValidityError(e, '', 'none');
        };
        e.target.reportValidity();
    });

    // Тип житла
    const type = document.getElementById('type');

    type.addEventListener('change', (e) => {

        switch(e.target.value) {
            case 'bungalow': 
                minimalPrice = 0;
                break;
            case 'house': 
                minimalPrice = 5000;
                break;
            case 'flat': 
                minimalPrice = 1000;
                break;
            case 'palace': 
                minimalPrice = 10000;
                break;
            default: break;
        };

        price.setAttribute('placeholder', minimalPrice);
    });

    // Час заїзду та виїзду
    const timein = document.getElementById('timein');
    const timeout = document.getElementById('timeout');

    timein.addEventListener('change', (e) => {
        timeout.querySelector('[selected]').removeAttribute('selected');
        timeout.querySelector(`option[value="${e.target.value}"]`).setAttribute('selected', '');
    });

    timeout.addEventListener('change', (e) => {
        timein.querySelector('[selected]').removeAttribute('selected');
        timein.querySelector(`option[value="${e.target.value}"]`).setAttribute('selected', '');
    });

    // Кількість кімнат
    const roomNumber = document.getElementById('room_number');
    const capacity = document.getElementById('capacity');

    capacity.innerHTML = '<option value="1">для 1 гостя</option>';

    roomNumber.addEventListener('change', (e) => {

        switch(e.target.value) {
            case '1': 
                capacity.innerHTML = '<option value="1">для 1 гостя</option>';
                break;
            case '2': 
                capacity.innerHTML = '<option value="2">для 2 гостей</option><option value="1">для 1 гостя</option>';
                break;
            case '3': 
                capacity.innerHTML = '<option value="3" selected>для 3 гостей</option><option value="2">для 2 гостей</option><option value="1">для 1 гостя</option>';
                break;
            case '100': 
                capacity.innerHTML = '<option value="0">не для гостей</option>';
                break;
            default: break;
        };
    });

    // Адреса (координати)
    const address = document.getElementById('address');

    address.setAttribute('value', '35.68506, 139.75283');

    address.addEventListener('focus', (e) => {
        e.target.blur();
    });

    // Avatar
    const avatarInput = document.getElementById('avatar');
    const avatarPreview = document.querySelector('.ad-form-header__preview img');

    avatarInput.addEventListener('change', (e) => {

        const reader = new FileReader();

        const selectedFile = e.target.files[0];
        
        if(!e.target.files[0].type.match('image.*')) {
            showValidityError(e, 'Завантажити можна лише зображення');
            e.target.reportValidity();
            return;
        } else {
            showValidityError(e, '', 'none');
            e.target.reportValidity();
        };

        reader.onload = function(event) {
            avatarPreview.src = event.target.result;
            avatarPreview.style.objectFit = 'cover';
            };

        reader.readAsDataURL(selectedFile);
    });

    // Фото житла
    const imagesInput = document.getElementById('images');
    const imagesContainer = document.querySelector('.ad-form__photo');

    imagesInput.addEventListener('change', (e) => {
        const reader = new FileReader();

        const selectedFile = e.target.files[0];

        if(!e.target.files[0].type.match('image.*')) {
            showValidityError(e, 'Завантажити можна лише зображення');
            e.target.reportValidity();
            return;
        } else {
            showValidityError(e, '', 'none');
            e.target.reportValidity();
        };

        reader.onload = function (event) {
            const newPhoto = document.createElement('img');
            newPhoto.style.width = '70px';
            newPhoto.style.height = '70px';
            newPhoto.style.objectFit = 'cover';
            newPhoto.src = event.target.result;
            imagesContainer.append(newPhoto);
            imagesContainer.style.display = 'grid';
            imagesContainer.style.gridGap = '5px';
            imagesContainer.style.gridTemplateColumns = 'repeat(4, 70px)';
            imagesContainer.style.width = 'auto';
            imagesContainer.style.height = 'auto';
            imagesContainer.style.backgroundColor = 'inherit';
        };

        reader.readAsDataURL(selectedFile);
    });

};