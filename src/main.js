import TripPresenter from './presenter/trip-presenter.js';
import Model from './model/model.js';
import PointsApiService from './points-api-server.js';

const mainContainerElement = document.querySelector('.trip-events');

const model = new Model(new PointsApiService());

const tripPresenter = new TripPresenter(mainContainerElement, model);

tripPresenter.init();
