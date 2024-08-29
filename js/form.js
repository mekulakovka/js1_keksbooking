import { resetSlider } from './price-slider.js';
import { resetMap } from './map.js';
import { resetFilter } from './filter.js';

const form = document.querySelector('.ad-form');
const submitButton = form.querySelector('.ad-form__submit');
const resetButton = form.querySelector('.ad-form__reset');

const propertyType = form.querySelector('[name="type"]');
const propertyPrice = form.querySelector('[name="price"]');

const roomsField = form.querySelector('[name="rooms"]');
const capacityField = form.querySelector('[name="capacity"]');

const timeIn = form.querySelector('[name="timein"]');
const timeOut = form.querySelector('[name="timeout"]');

const avatarChooser = document.querySelector('.ad-form__field input[type=file]');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const imgChooser = document.querySelector('.ad-form__upload input[type=file]');
const imgPreview = document.querySelector('.ad-form__photo');

const NAME_LENGTH_MIN = 30;
const NAME_LENGTH_MAX = 100;

const AVATAR_PREVIEW_DEFAULT = 'img/muffin-grey.svg';

const MinPrices = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
};
const MAX_PRICE = 100000;

const CapacityOption = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0']
};

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

//превью аватарки
avatarChooser.addEventListener('change', () => {
  const file = avatarChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });

  if (matches) {
    avatarPreview.src = URL.createObjectURL(file);
  }
});

//превью картинки отеля
imgChooser.addEventListener('change', () => {
  const file = imgChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });

  if (matches) {
    imgPreview.innerHTML = `<img src="${URL.createObjectURL(file)}" alt="Изображение жилья" width="70" height="70">`;
  }
});

//время заезда и выезда
timeIn.addEventListener('change', () => {
	timeOut.value = timeIn.value;
});
timeOut.addEventListener('change', () => {
	timeIn.value = timeOut.value;
});

//инициализация pristine
const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__error-message',
}, false);

//валидация заголовка объявления 
const validateTitle = (value) => {
  return value.length >= NAME_LENGTH_MIN && value.length <= NAME_LENGTH_MAX;
}

pristine.addValidator(
  form.querySelector('[name="title"]'),
  validateTitle,
  'Длина заголовка должна быть от 30 до 100 символов'
);

//валидация цены
const setMinPrice = () => {	
	let minPrice = MinPrices[propertyType.value];
	propertyPrice.placeholder = minPrice;
	propertyPrice.min = minPrice;
}

propertyType.addEventListener('change', () => {
	setMinPrice();	
});

const validatePrice = (value) => {
  return value >= MinPrices[propertyType.value] && value <= MAX_PRICE;
}

const minPriceErrorMessage = () => {
  const currentTypeValue = form.querySelector('[name="type"]').value;
  return `Минимальная цена за ночь в выбранном типе жилья - ${MinPrices[currentTypeValue]}`
}

pristine.addValidator(
  propertyPrice,
  validatePrice,
  minPriceErrorMessage
);

//валидация количества гостей в комнатах
const validateCapacity = () => {
	return CapacityOption[roomsField.value].includes(capacityField.value);
};

const getCapacityErrorMessage = () => {
	if (roomsField.value === '100') {
		return `100 комнат может быть только не для гостей`;
	} else if (capacityField.value === '0') {
		return `Не для гостей может быть только 100 комнат`;
	} else
    return `${roomsField.value} ${roomsField.value === '1' ? 'комната вмещает' : 'комнаты вмещают'} не больше ${roomsField.value} ${roomsField.value === '1' ? 'гостя' : 'гостей'}`;
};

pristine.addValidator(
	capacityField, 
	validateCapacity, 
	getCapacityErrorMessage
);

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Отправляю...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

//отправка формы
const setOnFormSubmit = (cb) => {
  form.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if (isValid) {
      blockSubmitButton();
      await cb(new FormData(form));
      unblockSubmitButton();
    } 
  });
};

//очистка формы 
const resetForm = () => {
  form.reset();
  pristine.reset();
  resetSlider();
  propertyPrice.min = 0;
  propertyPrice.placeholder = 0;  
  avatarPreview.src = AVATAR_PREVIEW_DEFAULT;
  imgPreview.innerHTML = '';
}

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault;  
  resetFilter();
  resetForm();
  resetMap();  
});

export {setOnFormSubmit, resetForm}