import TripPresenter from './presenter/trip-presenter.js';
import {generateAllTestTripPointsData, AllTestTripPointsDestination} from './modal/data.js';

const POINTS_COUNT = 3;

const mainContainerElement = document.querySelector('.trip-events');

const tripPresenter = new TripPresenter();

tripPresenter.init(mainContainerElement);
