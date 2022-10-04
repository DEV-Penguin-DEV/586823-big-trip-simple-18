import { generateTripPoints, generateTripPointOffers, generateTripPointDestinations } from './data.js';
import { COUNT_OF_TRIP_POINTS } from '../constants.js';
import Observable from '../framework/observable.js';

export default class Model extends Observable {
  #destinations = generateTripPointDestinations();
  #offersByTypes = generateTripPointOffers();
  #tripPoints = generateTripPoints(COUNT_OF_TRIP_POINTS, this.#offersByTypes, this.#destinations);

  get tripPoints() {
    return this.#tripPoints;
  }

  get offersByTypes() {
    return this.#offersByTypes;
  }

  get destinations() {
    return this.#destinations;
  }

  updatePoint = (updateType, update) => {
    const index = this.#tripPoints.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    this.#tripPoints = [
      ...this.#tripPoints.slice(0, index),
      update,
      ...this.#tripPoints.slice(index + 1),
    ];

    this._notify(updateType, update);
  };

  addPoint = (updateType, update) => {
    this.#tripPoints = [
      update,
      ...this.#tripPoints,
    ];

    this._notify(updateType, update);
  };

  deletePoint = (updateType, update) => {
    const index = this.#tripPoints.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    this.#tripPoints = [
      ...this.#tripPoints.slice(0, index),
      ...this.#tripPoints.slice(index + 1),
    ];

    this._notify(updateType);
  };
}
