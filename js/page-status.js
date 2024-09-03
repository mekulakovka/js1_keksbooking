import { getData } from './api.js';
import { showAlert } from './util.js';
import { turnFilterOn, filterObjects, setOnFilters } from './filter.js';
import { setObjectsOnMap } from './map.js';

const form = document.querySelector('.ad-form');
const fieldsetforms = form.querySelectorAll('fieldset');
const filterForm = document.querySelector('.map__filters');
const filterFieldset = filterForm.querySelector('fieldset');
const selectFilterForms = filterForm.querySelectorAll('select');

const onGetDataSuccess = (data) => {
  turnFilterOn(data);
  setObjectsOnMap(filterObjects());
  setOnFilters(setObjectsOnMap);
};  

const setPageNotActive = () => {
	form.classList.add('ad-form--disabled');
	fieldsetforms.forEach((item) => {
		item.disabled = true;
	});

	filterForm.classList.add('map__filters--disabled');
	selectFilterForms.forEach((item) => {
		item.disabled = true;
	});
	filterFieldset.disabled = true;
}

const setPageActive = () => {
	form.classList.remove('ad-form--disabled');	
	fieldsetforms.forEach((item) => {
		item.disabled = false;
	});

	getData(onGetDataSuccess, showAlert);
}

export { setPageNotActive, setPageActive }