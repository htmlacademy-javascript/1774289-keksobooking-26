import { getLocationString } from './utils.js';

const ZOOM = 13;
const PIN_SIZE = 40;
const MAIN_PIN_SIZE = 52;
const PIN_RATIO = 0.5;
// const LAYER_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
// const LAYER_COPY = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const MAIN_LOCATION = {
  lat: 35.68950,
  lng: 139.69171,
};

let isInitiated = false;

const map = L.map('map-canvas');
const markerGroup = L.layerGroup().addTo(map);

const setPin = (size, filename) => L.icon({
  iconUrl: `./img/${filename}.svg`,
  iconSize: [size, size],
  iconAnchor: [size * PIN_RATIO, size],
});

const mainPinMarker = L.marker(MAIN_LOCATION, {
  draggable: true,
  icon: setPin(MAIN_PIN_SIZE, 'main-pin')
}).addTo(map);

mainPinMarker.addTo(map);

export const createMarker = (createTemplate) => (item) => {
  L.marker(item.location, {
    icon: setPin(PIN_SIZE, 'pin')
  })
    .addTo(markerGroup)
    .bindPopup(createTemplate(item));
};

export const addMapHandlers = (addressElement) => {
  mainPinMarker.on('moveend', (evt) => {
    addressElement.valu = getLocationString(evt.target.getLatLng());
  });
};

export const resetMap = () => {
  mainPinMarker.setLatLng(MAIN_LOCATION);
  map.closePopup().setView(MAIN_LOCATION, ZOOM);
};

export const renderMap = (data, createBaloon, loadHandler) => {
  if (isInitiated) {
    markerGroup.clearLayers();
    loadHandler();
  } else {
    isInitiated = true;
    map.on('load', loadHandler);
  }

  data.forEach(createMarker(createBaloon));
  map.setView(MAIN_LOCATION, ZOOM);
};

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);
// L.tileLayer(LAYER_URL, { attribution: LAYER_COPY }).addTo(map);


