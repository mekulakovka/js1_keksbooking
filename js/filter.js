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

const FilterRooms = {
  ANY: 'any',
  ONE: 1,
  TWO: 2,
  THREE: 3
};

const FilterGuests = {
  ANY: 'any',
  ONE: 2,
  TWO: 1,
  THREE: 0
};

let featuresArray = [];

const ITEMS_COUNT = 10;

let currentTypeFilter = '';
let currentPriceFilter = '';
let currentRoomsFilter = '';
let currentGuestsFilter = '';

let objects = [];

const filterObjectsType = (elements) => {
  if (currentTypeFilter !== 'any') {
    return elements.filter(({offer}) => offer.type === currentTypeFilter );  
  }
  return elements;
};

const filterObjectsPrice = (elements) => {

  const parsePrice = (i) => {
    let priceRange = '';
    i = parseInt(i);
    
    if(i > 50000) {
      priceRange = 'high';
    } else if (i < 10000){
      priceRange = 'low'
    } else {
      priceRange = 'middle'
    }
    return priceRange
  }

  if (currentPriceFilter !== 'any') {
    return elements.filter(({offer}) => parsePrice(offer.price) === currentPriceFilter );  
  }
  return elements;
};

const filterObjectsRooms = (elements) => {

  if (currentRoomsFilter !== 'any') {                
    return elements.filter(({offer}) => offer.rooms == currentRoomsFilter );  
  }
  return elements;
};

const filterObjectsGuests = (elements) => {
  
  if (currentGuestsFilter !== 'any') {
    return elements.filter(({offer}) => offer.guests == currentGuestsFilter );  
  }
  return elements;
};

const filterObjectsFeatures = (elements, value) => {

  return elements.filter(({offer}) => {
    let features = offer.features;
    if (features) {
      if ( features.indexOf(value) !== -1 ) {
        return true;
      }
    }
  });
};

const filterObjects = () => {
  let sortedObjects = [...objects];

  sortedObjects = filterObjectsType(sortedObjects);   
  sortedObjects = filterObjectsPrice(sortedObjects);
  sortedObjects = filterObjectsRooms(sortedObjects);
  sortedObjects = filterObjectsGuests(sortedObjects);  
  

  if (featuresArray) {
    featuresArray.forEach((item) => {
      sortedObjects = filterObjectsFeatures(sortedObjects, item);  
    });    
  }

  return sortedObjects.slice(0, ITEMS_COUNT);
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

  featuresArray = []; 

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
    if ((selectedOption.value === currentTypeFilter) || (selectedOption.value === currentPriceFilter) || (selectedOption.value === currentRoomsFilter) || (selectedOption.value === currentGuestsFilter)) {
      return;
    }

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
        featuresArray.push(currentValue);        
      } else {
        const i = featuresArray.indexOf(currentValue);
        featuresArray.splice(i,1);
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