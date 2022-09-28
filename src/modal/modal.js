import { generateTripPoints, generateTripPointOffers } from './data.js';
import { COUNT_OF_TRIP_POINTS } from '../constants.js';

export default class Modal {
  #offersByTypes = generateTripPointOffers();
  #tripPoints = generateTripPoints(COUNT_OF_TRIP_POINTS, this.#offersByTypes);

  get tripPoints() {
    return this.#tripPoints;
  }

  get offersByTypes() {
    return this.#offersByTypes;
  }
}
