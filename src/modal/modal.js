import {generateTripPoints} from './data.js';
import {COUNT_OF_TRIP_POINTS} from '../constants.js';

export default class Modal {
  tripPoints = generateTripPoints(COUNT_OF_TRIP_POINTS);

  get () {
    return this.tripPoints;
  }
}
