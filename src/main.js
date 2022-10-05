import TripPresenter from './presenter/trip-presenter.js';
import Model from './model/model.js';
import PointsApiService from './points-api-server.js';
import OffersApiService from './offers-api-server.js';
import DestinationsApiService from './destinations-api-server.js';

const mainContainerElement = document.querySelector('.trip-events');

const AUTHORIZATION = 'Basic hSeoijga2j';
const END_POINT = 'https://18.ecmascript.pages.academy/big-trip';

const model = new Model(new PointsApiService(END_POINT, AUTHORIZATION), new OffersApiService(END_POINT, AUTHORIZATION), new DestinationsApiService(END_POINT, AUTHORIZATION));
model.init();

const tripPresenter = new TripPresenter(mainContainerElement, model);

tripPresenter.init();
