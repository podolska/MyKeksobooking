const form = document.querySelector('.ad-form');
const formFilters = document.querySelector('.map__filters');
const formElements = form.querySelectorAll('fieldset');


export default function changeState (state) {

    //  Форма заповнення інформації про оголошення, стан disabled
    if(state === 'inactive') {
        form.classList.add('ad-form--disabled');
    };
    if(state === 'active') {
        form.classList.remove('ad-form--disabled');
    };

    // Блокування усіх інтерактивних елементів форми 
    Array.from(formElements).map(el => {
        if(state === 'inactive') {
            el.setAttribute('disabled', '');
        };
        if(state === 'active') {
            el.removeAttribute('disabled');
        };    
    });

    // Блокування форми з фільтрами 
    if(state === 'inactive') {
        formFilters.classList.add('map__filters--disabled');
        Array.from(formFilters.children).map(el => el.setAttribute('disabled', ''));
    };
  
};
