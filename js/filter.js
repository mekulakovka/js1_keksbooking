import { debounce } from './util.js';
import { setObjectsOnMap } from './map.js';

const filterForm = document.querySelector('.map__filters');
const filtersInForm = filterForm.querySelectorAll('select');

const selectTypes = filterForm.querySelector('#housing-type');
const selectPrices = filterForm.querySelector('#housing-price');
const selectRooms = filterForm.querySelector('#housing-rooms');
const selectGuests = filterForm.querySelector('#housing-guests');
const selectFeatures = filterForm.querySelectorAll('#housing-features input');

const FilterType = {
  ANY: 'any',
  BUNGALOW: 'bungalow',
  FLAT: 'flat',
  HOTEL: 'hotel',
  HOUSE: 'house',
  PALACE: 'palace'
};

const FilterPrice = {
  ANY: 'any',
  MIDDLE: 'middle',
  LOW: 'low',
  HIGH: 'high'
};
const MID_HIGH_PRICE = 50000;
const MID_LOW_PRICE = 10000;

const FilterRooms = {
  ANY: 'any',
  ONE: '1',
  TWO: '2',
  THREE: '3'
};

const FilterGuests = {
  ANY: 'any',
  ONE: '2',
  TWO: '1',
  THREE: '0'
};

let selectedFeatures = [];

const ITEMS_COUNT = 10;

let currentTypeFilter = '';
let currentPriceFilter = '';
let currentRoomsFilter = '';
let currentGuestsFilter = '';

let objects = [];

const parsePrice = (i) => {
  let priceRange = '';
  i = parseInt(i);
  
  if(i > MID_HIGH_PRICE) {
    priceRange = 'high';
  } else if (i < MID_LOW_PRICE){
    priceRange = 'low'
  } else {
    priceRange = 'middle'
  }
  return priceRange
}

const filterByType = ({offer}) => {
  if (offer.type === currentTypeFilter || currentTypeFilter === 'any') {
    return true;
  } else  {
    return false;
  }
};

const filterByPrice = ({offer}) => {
  if (parsePrice(offer.price) === currentPriceFilter || currentPriceFilter === 'any') {
    return true;
  } else {
    return false;
  }
};

const filterByRooms = ({offer}) => {
  if (offer.rooms === parseInt(currentRoomsFilter) || currentRoomsFilter === 'any') {
    return true;
  } else {
    return false;
  }
};

const filterByGuests = ({offer}) => {  
  if (offer.guests === parseInt(currentGuestsFilter) || currentGuestsFilter === 'any') {
    return true;
  } else {
    return false;
  }
};

const checkFeaturesContains = (features) => {
  for (let i = 0; i < selectedFeatures.length; i++) {
    if (features.indexOf(selectedFeatures[i]) == -1 ) {
      return false;
    }
  }
  return true;  
}

const filterByFeatures = ({offer}) => {
  if (selectedFeatures.length < 1) { 
    return true;
  }
  if (selectedFeatures.length > 0 && offer.features) {
      return checkFeaturesContains(offer.features);
  } else {
    return false;
  }
};

const filterObjects = () => {
  let offers = [...objects];  

  return offers.filter((item) => filterByType(item) && filterByPrice(item) && filterByRooms(item) && filterByGuests(item) && filterByFeatures(item)).slice(0, ITEMS_COUNT);
}

const setFilterFormActive = () => {
  filterForm.classList.remove('map__filters--disabled');
  filtersInForm.forEach((item) => {
   item.disabled = false;
  });
  filterForm.querySelector('fieldset').disabled = false;
}

const setSelectDefault = (select) => {
  select.querySelector('option').selected = false;
  select.querySelector('option:first-child').selected = true;
}

const turnFilterOn = (loadedObjects) => {
  setFilterFormActive();
  objects = [...loadedObjects];  

  currentTypeFilter = FilterType.ANY;
  currentPriceFilter = FilterPrice.ANY;
  currentRoomsFilter = FilterRooms.ANY;
  currentGuestsFilter = FilterGuests.ANY; 

  selectedFeatures = []; 

  setSelectDefault(selectTypes);
  setSelectDefault(selectPrices);
  setSelectDefault(selectRooms);
  setSelectDefault(selectGuests);

  selectFeatures.forEach((item) => item.checked = false );
};

const setOnSelect = (select, cb) => {
  const debouncedRenderObjects = debounce(cb);

  select.addEventListener('change', (evt) => {    
    const selectedOption = evt.target;

    select.querySelector('option').selected = false;
    selectedOption.selected = true;

    switch (select) {
      case selectTypes:
        currentTypeFilter = selectedOption.value;
        break;
      case selectPrices:
        currentPriceFilter = selectedOption.value;
        break;
      case selectRooms:
        currentRoomsFilter = selectedOption.value;
        break;
      case selectGuests:
        currentGuestsFilter = selectedOption.value;
        break;
      default:
        console.log('Ошибка, такого фильтра не существует');
    }    

    debouncedRenderObjects(filterObjects());
  });  
}

const setOnFeatures = (cb) => {
  const debouncedRenderObjects = debounce(cb); 

  selectFeatures.forEach((item) => {    
    item.addEventListener('change', (evt) => {          
      const selectedOption = evt.target;
      const currentValue = selectedOption.value;

      if (selectedOption.checked) {
        selectedFeatures.push(currentValue);        
      } else {
        const i = selectedFeatures.indexOf(currentValue);
        selectedFeatures.splice(i,1);
        }
      debouncedRenderObjects(filterObjects());      
    });
  });  
}

const setOnFilters = (cb) => {

  setOnSelect(selectTypes, cb); 
  setOnSelect(selectPrices, cb); 
  setOnSelect(selectRooms, cb); 
  setOnSelect(selectGuests, cb); 

  setOnFeatures(cb);
};

const resetFilter = () => {
  turnFilterOn(objects);
  setObjectsOnMap(filterObjects());
}

export { 
  turnFilterOn, 
  filterObjects, 
  setOnFilters,
  resetFilter
};