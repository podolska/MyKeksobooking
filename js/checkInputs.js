// РОБОТА З ФОРМОЮ. КОНТРОЛЬ ВВЕДЕНИХ КОРИСТУВАЧЕМ ДАНИХ
export default function checkInputs () {

    let minimalPrice = 1000;

    function showValidityError (e, title, color='0 0 2px 2px #ff6547') {
        e.style.boxShadow = color;
        e.setCustomValidity(title);
    }; 

    // Заголовок оголошення
    const title = document.getElementById('title');

    title.setAttribute('required', '');

    title.addEventListener('input', (e) => {
        const inputTitle = document.getElementById('title');

        if(inputTitle.value === "") {
            inputTitle.style.boxShadow = 'none';
        } else if(inputTitle.value.length < 30 ) {
            showValidityError(inputTitle, 'Заголовок повинен містити мінімум 30 символів');
        } else if(inputTitle.value.length > 100) {
            showValidityError(inputTitle, 'Заголовок повинен містити максимум 100 символів');
        } else if(inputTitle.value === '') {
            inputTitle.style.boxShadow = 'none';
        } else {
            showValidityError(inputTitle, '', 'none');
        };
        inputTitle.reportValidity();
    });

    // Ціна за ніч
    const price = document.getElementById('price');

    price.setAttribute('required', '');

    price.addEventListener('input', checkPrice);

    function checkPrice (e) { 
        const inputPrice = document.getElementById('price');

        if(inputPrice.value === "") {
            inputPrice.style.boxShadow = 'none';
        } else if(inputPrice.value < minimalPrice) {
            showValidityError(inputPrice, `Мінімальна вартість - ${minimalPrice}`);
        } else if(inputPrice.value > 1000000) {
            showValidityError(inputPrice, 'Максимальна вартість - 1 000 000');
        } else {
            showValidityError(inputPrice, '', 'none');
        };
        inputPrice.reportValidity();
    }

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

        checkPrice();
    });

    // Час заїзду та виїзду
    const timein = document.getElementById('timein');
    const timeout = document.getElementById('timeout');

    timein.addEventListener('change', (e) => changeTimeOption(e, timeout));

    timeout.addEventListener('change', (e) => changeTimeOption(e, timein));

    function changeTimeOption (e, element) {
        element.querySelector('[selected]').removeAttribute('selected');
        element.querySelector(`option[value="${e.target.value}"]`).setAttribute('selected', '');
    };

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
            showValidityError(e.target, 'Завантажити можна лише зображення');
            e.target.reportValidity();
            return;
        } else {
            showValidityError(e.target, '', 'none');
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
    
    imagesInput.addEventListener("change", function (e) {
        const reader = new FileReader();
        const selectedFile = e.target.files[0];

        if(!e.target.files[0].type.match('image.*')) {
            showValidityError(e.target, 'Завантажити можна лише зображення');
            e.target.reportValidity();
            return;
        } else {
            showValidityError(e.target, '', 'none');
            e.target.reportValidity();
        };

        reader.onload = function (event) {
            const newPhoto = document.createElement('img');
            newPhoto.style.width = '70px';
            newPhoto.style.height = '70px';
            newPhoto.style.objectFit = 'cover';
            newPhoto.src = event.target.result;
            newPhoto.setAttribute("name", e.target.files[0].name);
            newPhoto.classList.add('images');
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