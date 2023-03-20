import showResultMessage from "./showResultMessage.js";

export default function fetchData (map) {

    const form = document.querySelector('.ad-form');

    // Надсилання форми (submit)
    form.addEventListener('submit', (e) => {

        e.preventDefault();

        const promise = new Promise((res, rej) => {
            const data = new FormData(form);

            // Написати fetch ...

            return res('success');
        });

        promise
            .then(result => {
                console.log(result);
                showResultMessage('success');
                formReset();
                map();
            })
            .catch(error => {
                showResultMessage('error');
            })
            .finally(() => {
                
            });
    });

    // Очищення форми по кліку на кнопку "очистити"
    const resetButton = document.querySelector('.ad-form__reset');
    resetButton.addEventListener('click', (e) => {
        e.preventDefault();
        formReset();
    });

    // Очищення форми
    function formReset () {

        const avatarPreview = document.querySelector('.ad-form-header__preview img');
        avatarPreview.src = 'img/muffin-grey.svg';

        const title = document.getElementById('title');
        title.value = '';

        const address = document.getElementById('address');
        address.value ='35.68506, 139.75283';

        const price = document.getElementById('price');
        price.value = '';
        price.setAttribute('placeholder', '1000');

        const type = document.getElementById('type');
        type.value = 'flat';
       
        const timein = document.getElementById('timein');
        timein.value = '12:00';

        const timeout = document.getElementById('timeout');
        timeout.value = '12:00';

        const roomNumber = document.getElementById('room_number');
        roomNumber.value = '1';

        const capacity = document.getElementById('capacity');
        capacity.value = '1';

        const description = document.getElementById('description');
        description.value = '';

        const checkedFeatures = Array.from(document.querySelectorAll('input[name="features"]:checked'));
        checkedFeatures.map(el => el.checked = false); 

        const imagesContainer = document.querySelector('.ad-form__photo');
        imagesContainer.innerHTML = '';
    };
    
};