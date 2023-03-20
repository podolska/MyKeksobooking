// Генерує тимчасові дані для розробки інтерфейсу
export default async function getData (map) {

    try {

        // --------- ГЕНЕРУЄ МАСИВ ОГОЛОШЕНЬ ---------
        let data = [];

        for(let i = 1; i < 9; i++) {
    
            // Генерує номер аватарки
            const avatar = i<9 ? `0${i}` : i;
    
            function randomDataItem (min, max, arr) {
                const randomIndex = Math.floor(Math.random() * (max - min + 1) + min);
                return arr[randomIndex];
            };
    
            // Генерує значення title
            const titles = ['Стильне сучасне житло', 'Комфортне помешкання для відпочинку', 'Житло недорого', 'Ідеально для туризму'];
            const title = randomDataItem(0, 3, titles);
    
            // Генерує значення price
            const price = Math.floor(Math.random() * (100000 + 1));
    
            // Генерує значення rooms
            const rooms = Math.floor(Math.random() * 5 + 1);
    
            // Генерує значення guests
            const guests = Math.floor(Math.random() * 10 + 1);
    
            // Генерує значення type
            const types = ['palace', 'flat', 'house', 'bungalow'];
            const type = randomDataItem(0, 3, types);
    
            // Генерує значення checkin
            const checkins = ['12:00', '13:00', '14:00'];
            const checkin = randomDataItem(0, 2, checkins);
    
            // // Генерує значення checkout
            const checkouts = ['12:00', '13:00', '14:00'];
            const checkout = randomDataItem(0, 2, checkouts);
    
            function getRandomArr (arr) {
                const quanity = Math.floor(Math.random() * arr.length + 1 );
                let newArr = arr.filter((el, index) => index < quanity);
                if(quanity === 0) {
                    return [];
                } else {
                    return newArr;      
                }
            };
    
            // Генерує features
            const featuresArr = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
            let features = getRandomArr(featuresArr);
    
            // Генерує photos
            const photoArr = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2. jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
            const photos = getRandomArr(photoArr);
    
            // Генерує значення location x
            const x = (Math.random() * (35.70000 - 35.65000) + 35.65000).toFixed(5);
    
            // Генерує значення location y
            const y = (Math.random() * (139.80000 - 139.70000) + 139.70000).toFixed(5);
    
    
            data.push({
                author: {
                    avatar: `img/avatars/user${avatar}.png`
                },
                offer: {
                    title,
                    address: `${x}, ${y}`,
                    price,
                    type, 
                    rooms,
                    guests,
                    checkin,
                    checkout,
                    features,
                    description: `Чудова квартира-студія у центрі Токіо. Підходить як для туристів, так і для бізнесменів. Квартира повністю укомплектована та нещодавно відремонтована.`,
                    photos,
                },
                location: {
                    x,
                    y, 
                },
            });
        };

        return data;

    } catch (error) {
        const newMessage = document.createElement('div');
        newMessage.innerHTML = '<div class="error"><p class="error__message">Помилка сервера</p></div>';
        const main = document.querySelector('main');
        main.append(newMessage);
    };

};

getData();