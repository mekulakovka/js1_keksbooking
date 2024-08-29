const cardTemplate = document.querySelector('#card')
	.content
	.querySelector('.popup');


const createCardField = (selector, text) => {
	if (text) {
		selector.textContent = text;
	} else {
		selector.remove();
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
	const authorAvatar = cardElement.querySelector('.popup__avatar');
	const objectPhotos = cardElement.querySelector('.popup__photos');

//Заголовок 
	createCardField(cardTitle, offer.title);

//Адрес
	createCardField(objectAddress, offer.address);

//Цена
	createCardField(objectPrice, offer.price);

//Тип жилья
	switch (offer.type) {
		case 'flat':
			objectType.textContent = 'Квартира';
			break;
		case 'bungalow':
			objectType.textContent = 'Бунгало';
			break;
		case 'house':
			objectType.textContent = 'Дом';
			break;
		case 'palace':
			objectType.textContent = 'Дворец';
			break;
		case 'hotel':
			objectType.textContent = 'Отель';
			break;
		default:
			objectType.remove();
	}

//Кол-во гостей
	if (offer.rooms) {	
		objectCapacity.textContent = offer.rooms + ' комнаты для ' + offer.guests + ' гостей';
	} else 
		objectCapacity.remove();

//Заезд
	if (offer.checkin) {	
		objectCheckIn.textContent = 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout;
	} else 
		objectCheckIn.remove();
	
//Удобства
	if (offer.features) {
		const offerFeatures = offer.features;
		const featuresList = cardElement.querySelectorAll('.popup__feature');

		featuresList.forEach((featuresListItem) => {
			const isNecessary = offerFeatures.some(
				(offerFeature) => featuresListItem.classList.contains('popup__feature--' + offerFeature),
			);

			if (!isNecessary) {
				featuresListItem.remove();
			}
		});
	}	else {
		cardElement.querySelector('.popup__features').remove();
	}

//Описание
	createCardField(objectDescription, offer.description);	

//Фотографии			
	if (offer.photos) {
		const offerPhotos = offer.photos;
		offerPhotos.forEach((item) => {
			let photoItem = cardElement.querySelector('.popup__photo').cloneNode(true);
			photoItem.src = item;
			objectPhotos.append(photoItem);  		  
		});
		cardElement.querySelector('.popup__photo:first-child').remove();
	} else 
		objectPhotos.remove();

//Аватар
	if (author.avatar) {
		authorAvatar.src = author.avatar;
	} else
		authorAvatar.remove();


	return(cardElement);
}

export { createCard };
