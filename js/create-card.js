const cardTemplate = document.querySelector('#card')
	.content
	.querySelector('.popup');


const checkIfNotEmpty = (selector, item) => {
	if (!item) {		
		selector.remove();
		return false;
	}
	return true;
}

const createTextField = (selector, text) => {
	if (checkIfNotEmpty(selector, text)) {
		selector.textContent = text;		
	}
}

const setObjectType = (selector, type) => {
	switch (type) {
		case 'flat':
			selector.textContent = 'Квартира';
			break;
		case 'bungalow':
			selector.textContent = 'Бунгало';
			break;
		case 'house':
			selector.textContent = 'Дом';
			break;
		case 'palace':
			selector.textContent = 'Дворец';
			break;
		case 'hotel':
			selector.textContent = 'Отель';
			break;
		default:
			selector.remove();
	}
}

const createFeatures = (selector, features) => {	
	if (checkIfNotEmpty(selector, features)) {
		const featuresArray = selector.querySelectorAll('.popup__feature');	

		featuresArray.forEach((featureItem) => {
			const isNecessary = features.some(
				(offerFeature) => featureItem.classList.contains('popup__feature--' + offerFeature),
			);

			if (!isNecessary) {
				featureItem.remove();
			}
		});
	}
}

const createPhotos = (selector, photo, photos) => {
	if (checkIfNotEmpty(selector, photos)) {		
		photos.forEach((item) => {
			let photoItem = photo.cloneNode(true);
			photoItem.src = item;
			selector.append(photoItem);  		  
		});
		selector.querySelector('.popup__photo:first-child').remove();
	}
}

const createCard = ({author, offer}) => {
	const cardElement = cardTemplate.cloneNode(true);

	const cardTitle = cardElement.querySelector('.popup__title');
	const objectAddress = cardElement.querySelector('.popup__text--address');
	const objectPrice = cardElement.querySelector('.popup__text--price');
	const objectType = cardElement.querySelector('.popup__type');
	const objectCapacity = cardElement.querySelector('.popup__text--capacity');
	const objectCheckIn = cardElement.querySelector('.popup__text--time');
	const objectDescription = cardElement.querySelector('.popup__description');
	const featuresList = cardElement.querySelector('.popup__features');
	const authorAvatar = cardElement.querySelector('.popup__avatar');
	const objectPhotos = cardElement.querySelector('.popup__photos');
	const objectPhoto = cardElement.querySelector('.popup__photo');

//Заголовок 
	createTextField(cardTitle, offer.title);

//Адрес
	createTextField(objectAddress, offer.address);

//Цена
	createTextField(objectPrice, offer.price);
	objectPrice.insertAdjacentHTML('beforeend', '<span> ₽/ночь</span>');

//Тип жилья
	setObjectType(objectType, offer.type);

//Кол-во гостей
	if (checkIfNotEmpty(objectCapacity, offer.rooms)) {	
		objectCapacity.textContent = offer.rooms + ' комнаты для ' + offer.guests + ' гостей';
	}

//Заезд
	if (checkIfNotEmpty(objectCheckIn, offer.checkin)) {	
		objectCheckIn.textContent = 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout;
	}
	
//Удобства
	createFeatures(featuresList, offer.features);

//Описание
	createTextField(objectDescription, offer.description);	

//Фотографии			
	createPhotos(objectPhotos, objectPhoto, offer.photos);

//Аватар
	if (checkIfNotEmpty(authorAvatar, author.avatar)) {
		authorAvatar.src = author.avatar;
	}

	return(cardElement);
}

export { createCard };
