import changeState from "./changeState.js";
import getMap from './getMap.js';
import checkInputs from './checkInputs.js';
import fetchData from './fetchData.js';
import getDataOnMap from './getDataOnMap.js';

// Переводить форму фільтрів і форму створення оголошення у неактивний стан
changeState('inactive');

try {
   // Ініціалізовує карту 
   const {getDefaultMap, map} = getMap(); 
   
   // Переводить форму фільтрів і форму створення оголошення у активний стан
   changeState('active');

    // Генерує масив оголошень і ставить мітки на карті
    getDataOnMap(map);

   // Перевіряє введені користувачем дані на відповідність обмеженням
   checkInputs();

   // Надсилає введені дані у форму на сервер
   fetchData(getDefaultMap);


} catch (error) {
    console.log(error);
};



