const form = document.querySelector('.ad-form');
const fieldsetforms = form.querySelectorAll('fieldset');
const filterForm = document.querySelector('.map__filters');
const selectFilterForms = filterForm.querySelectorAll('select');

const setPageNotActive = () => {
	form.classList.add('ad-form--disabled');
	fieldsetforms.forEach((item) => {
		item.disabled = true;
	});

	filterForm.classList.add('map__filters--disabled');
	selectFilterForms.forEach((item) => {
		item.disabled = true;
	});
	filterForm.querySelector('fieldset').disabled = true;
}

const setPageActive = () => {
	form.classList.remove('ad-form--disabled');	
	fieldsetforms.forEach((item) => {
		item.disabled = false;
	});
}

setPageNotActive();

export { setPageNotActive, setPageActive }