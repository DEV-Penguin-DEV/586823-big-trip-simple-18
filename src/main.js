import TripPresenter from './presenter/trip-presenter.js';
import Model from './model/model.js';

const mainContainerElement = document.querySelector('.trip-events');

const model = new Model();

const tripPresenter = new TripPresenter(mainContainerElement, model);

tripPresenter.init();
