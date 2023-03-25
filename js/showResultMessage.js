export default function showResultMessage (result) {

    const templateSuccess = document.getElementById('success');
    const templateError = document.getElementById('error');
    const main = document.querySelector('main');
    const body = document.querySelector('body');

    let message;
    let messageInDOM;

    // Клонує повідомлення з шаблону і додає у DOM
    if(result === 'success') {
        message = templateSuccess.content.cloneNode(true);
    };
    if(result === 'error') {
        message = templateError.content.cloneNode(true);
    };
    
    main.append(message);

    // Посилання на повідомлення, яке вже існує у DOM
    if(result === 'success') {
        messageInDOM = document.querySelector('.success');
    };
    if(result === 'error') {
        messageInDOM = document.querySelector('.error');
    };

    // Видаляє повідомллення
    messageInDOM.addEventListener('click', removeMessage);
    body.addEventListener('keydown', removeMessage);

    function removeMessage (e) {

        if(e.target.className === "success" || "error" ||'error__button') {
            messageInDOM.remove();
            return;
        };

        if (e.key === 'Escape' || 'Esc') {
            messageInDOM.remove();
            return;
        };

    };

};