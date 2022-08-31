import TripPresenter from './presenter/trip-presenter.js';
import Modal from './modal/modal.js';

const mainContainerElement = document.querySelector('.trip-events');

const tripPresenter = new TripPresenter();

const modal = new Modal();

tripPresenter.init(mainContainerElement, modal.tripPoints);
