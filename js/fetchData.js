import showResultMessage from "./showResultMessage.js";
import getDataOnMap from './getDataOnMap.js';

export default function fetchData (getDefaultMap, map) {

    const form = document.querySelector('.ad-form');
    
    // ЗАВАНТАЖЕННЯ ДАНИХ ІЗ СЕРВЕРА
    const promise = new Promise(async (res, rej) => {
        try {
            const result = await fetch('http://localhost:3000/offert');  
            if(result.ok) return res(result.json());
        } catch (error) {
            console.log(error);
            return rej(error);
        };
    });

    promise
        .then(result => {
            const data = result.data.result;
            getDataOnMap(map, data);
        })
        .catch(error => {
            showResultMessage('serverError');
        });

    // НАДСИЛАННЯ ДАНИХ З ФОРМИ НА СЕРВЕР ПРИ SUBMIT
    form.addEventListener('submit', async (e) => {

        e.preventDefault();

        const promise = new Promise(async (res, rej) => {
            try {
                const formData = new FormData(form);
                formData.delete('images');

                const images = [...document.querySelectorAll('.images')];
        
                for(let image of images) {
                    await fetch(image.src)
                        .then(res => res.blob())
                        .then(blob => {
                            const file = new File([blob], image.name, blob);
                            formData.append("images", file);
                        });
                };
        
                const result = await fetch("http://localhost:3000/offert", {
                    method: "POST",
                    body: formData
                });

                if(result.ok) return res(result.json());

            } catch (error) {
                return rej(error);
            }
        });
    
        promise
            .then(result => {
                getDataOnMap(map);
                showResultMessage('success');
                formReset();
                getDefaultMap();
            })
            .catch(error => {
                console.log(error);
                showResultMessage('error');
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

        document.querySelector('.ad-form-header__preview img').src = 'img/muffin-grey.svg';
        document.getElementById('avatar').value = '';

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