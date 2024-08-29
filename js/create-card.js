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

//Заголовок 
	createCardField(cardElement.querySelector('.popup__title'), offer.title);

//Адрес
	createCardField(cardElement.querySelector('.popup__text--address'), offer.address);

//Цена
	createCardField(cardElement.querySelector('.popup__text--address'), offer.price);

//Тип жилья
	switch (offer.type) {
		case 'flat':
			cardElement.querySelector('.popup__type').textContent = 'Квартира';
			break;
		case 'bungalow':
			cardElement.querySelector('.popup__type').textContent = 'Бунгало';
			break;
		case 'house':
			cardElement.querySelector('.popup__type').textContent = 'Дом';
			break;
		case 'palace':
			cardElement.querySelector('.popup__type').textContent = 'Дворец';
			break;
		case 'hotel':
			cardElement.querySelector('.popup__type').textContent = 'Отель';
			break;
		default:
			cardElement.querySelector('.popup__type').remove();
	}

//Кол-во гостей
	if (offer.rooms) {	
		cardElement.querySelector('.popup__text--capacity').textContent = offer.rooms + ' комнаты для ' + offer.guests + ' гостей';
	} else 
		cardElement.querySelector('.popup__text--capacity').remove();

//Заезд
	if (offer.checkin) {	
		cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout;
	} else 
		cardElement.querySelector('.popup__text--time').remove();
	
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
	createCardField(cardElement.querySelector('.popup__description'), offer.description);	

//Фотографии			
	if (offer.photos) {
		const offerPhotos = offer.photos;
		for (let i = 0; offerPhotos.length > i; i++) {					
			if (offerPhotos[i]) {
				let photoItem = cardElement.querySelector('.popup__photo').cloneNode(true);
				photoItem.src = offerPhotos[i];
				cardElement.querySelector('.popup__photos').append(photoItem);  		  
			}		
		}
		cardElement.querySelector('.popup__photo:first-child').remove();
	} else 
		cardElement.querySelector('.popup__photos').remove();

//Аватар
	if (author.avatar) {
		cardElement.querySelector('.popup__avatar').src = author.avatar;
	} else
		cardElement.querySelector('.popup__avatar').remove();


	return(cardElement);
}

export { createCard };
