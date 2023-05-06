import changeState from "./changeState.js";
import getMap from './getMap.js';
import checkInputs from './checkInputs.js';
import fetchData from './fetchData.js';

// Переводить форму фільтрів і форму створення оголошення у неактивний стан
changeState('inactive');

try {
   // Ініціалізовує карту 
   const {getDefaultMap, map} = getMap(); 
   
   // Переводить форму фільтрів і форму створення оголошення у активний стан
   changeState('active');

    // Отримує масив оголошень і надсилає введені дані у форму на сервер
    fetchData(getDefaultMap, map);

   // Перевіряє введені користувачем дані на відповідність обмеженням
   checkInputs();

} catch (error) {
    console.log(error);
};



