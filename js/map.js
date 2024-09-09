import { setPageNotActive, setPageActive } from './page-status.js';
import { createCard } from './create-card.js';

const propertyAddress = document.querySelector('#address');
const DEFAULT_ADDRESS = {
    lat: 35.68172,
    lng: 139.75392,
};

const setAddressValueDefault = () => {
	propertyAddress.value = `${DEFAULT_ADDRESS.lat}, ${DEFAULT_ADDRESS.lng}`;
}
setAddressValueDefault();
propertyAddress.placeholder = `${DEFAULT_ADDRESS.lat}, ${DEFAULT_ADDRESS.lng}`;	

let newMapAddress = DEFAULT_ADDRESS;

setPageNotActive();

//создание карты
const map = L.map('map-canvas')
  .on('load', () => {
    setPageActive();
  })
  .setView(DEFAULT_ADDRESS, 12);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainMarker = L.marker(
  DEFAULT_ADDRESS,
  {
    draggable: true,
    icon: mainPinIcon,
  },
);
mainMarker.addTo(map);

//получаем новый адрес при перемещении метки
mainMarker.on('moveend', (evt) => {
	newMapAddress = evt.target.getLatLng();
	propertyAddress.value = `${newMapAddress.lat.toFixed(5)}, ${newMapAddress.lng.toFixed(5)}`
});	


//добавляем похожие объявления на карту
const icon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

//записываем в массив координаты всех объявлений
const getPoints = (items) => {
	const locations = [items.length];
	for(let i = 0; i < items.length; i++) {
		locations[i] = items[i].location;
	}
	return locations;
};	

//создаем карточки с объявлениями
const makeCards = (elements) => {
	const cards = [];
	for(let i = 0; i < elements.length; i++) {
		cards[i] = createCard(elements[i]);
	}	
	return cards
};

const markers = [];

const createMarkers = (objects) => {
	const points = getPoints(objects);	
	const cards = makeCards(objects);	

	points.forEach(({lat, lng}, index) => {		
		const marker = L.marker({
			lat,
			lng,
		},
		{
			icon,
		});

		marker
			.addTo(map)
			.bindPopup(cards[index]);	

		markers[index] = marker;
	});
}

const removeMarkers = (array) => {
	array.forEach((item) => { item.remove() })
}

const setObjectsOnMap = (loadedObjects) => {	
	const objects = [...loadedObjects];

	removeMarkers(markers);
	
	if (objects.length !== 0) {
		createMarkers(objects);
	}
}

//сброс карты 
const resetMap = () => {
	setTimeout(setAddressValueDefault, 10);	//задержка, чтобы установка значения в инпут случалась после form.reset()	
	mainMarker.setLatLng(DEFAULT_ADDRESS);
	map.closePopup();
}

export { setObjectsOnMap, resetMap }