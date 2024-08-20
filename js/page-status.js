const form = document.querySelector('.ad-form');
const fieldsetform = form.querySelectorAll('fieldset');
const filterForm = document.querySelector('.map__filters');
const selectFilterForm = filterForm.querySelectorAll('select');

const setPageNotActive = () => {
	form.classList.add('ad-form--disabled');
	fieldsetform.forEach((item) => {
		item.disabled = true;
	});

	filterForm.classList.add('map__filters--disabled');
	selectFilterForm.forEach((item) => {
		item.disabled = true;
	});
	filterForm.querySelector('fieldset').disabled = true;
}

const setPageActive = () => {
	form.classList.remove('ad-form--disabled');	
	fieldsetform.forEach((item) => {
		item.disabled = false;
	});
}

setPageNotActive();

export { setPageNotActive, setPageActive }