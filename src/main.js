import TripPresenter from './presenter/trip-presenter.js';
import {generateAllTestTripPointsData} from './modal/data.js';

const mainContainerElement = document.querySelector('.trip-events');

const tripPresenter = new TripPresenter();

tripPresenter.init(mainContainerElement, generateAllTestTripPointsData);
