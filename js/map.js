import { getRandomOffers } from './random-offers.js';
import { OFFERS_COUNT } from './data.js';
import { generateCard } from './offer-card.js';

const MAIN_LOCATION = {
  lat: 35.68950,
  lng: 139.69171,
};

const ZOOM = {
  lat: 35.68950,
  lng: 139.69171,
};

const map = L.map('map-canvas')
  .on('load', () => {
    //console.log('Карта инициализирована');
  })
  .setView({
    lat: 35.68950,
    lng: 139.69171,
  }, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const pinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [16, 40],
});

// const markerGroup = L.layerGroup().addTo(map);

const cards = getRandomOffers(OFFERS_COUNT);

export const createMarker = (point) => {
  const {offer: { title }, location: { lat, lng }} = point;
  const marker = L.marker(
    {
      title,
      lat,
      lng,
    },
    {
      pinIcon,
    },
  );

  marker
    .addTo(map)
    .bindPopup(generateCard(point));
};

cards.forEach(createMarker);

// const points;

// points.slice(0, points.length / 2).forEach((point) => {
//   createMarker(point);
// });

// nextButton.addEventListener('click', () => {
//   markerGroup.clearLayers();
//   points.slice(points.length / 2).forEach((point) => {
//     createMarker(point);
//   });
//   nextButton.remove();
// });

// markerGroup.clearLayers();

const markerMain = L.marker(
  {
    lat: 35.68950,
    lng: 139.69135,
  },
  {
    draggable: true,
  },
);

markerMain.addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [40, 40],
  iconAnchor: [16, 40],
});

const mainPinMarker = L.marker(
  {
    lat: 35.68950,
    lng: 139.69171,
  },
  {
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

// resetButton.addEventListener('click', () => {
//   mainPinMarker.setLatLng({
//     lat: 35.68950,
//     lng: 139.69171,
//   });
// });

// mainPinMarker.on('moveend', (evt) => {
//   console.log(evt.target.getLatLng());
// });

mainPinMarker.remove();

export const resetMap = () => {
  mainPinMarker.setLatLng(MAIN_LOCATION);
  map.setView(MAIN_LOCATION, ZOOM);
};
