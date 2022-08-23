import TripPresenter from './presenter/trip-presenter.js';

const mainContainerElement = document.querySelector('.trip-events');

const tripPresenter = new TripPresenter();

tripPresenter.init(mainContainerElement);
