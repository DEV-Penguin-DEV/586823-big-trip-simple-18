/* eslint-disable camelcase */
import dayjs from 'dayjs';
import {createElement} from '../render.js';

const createTripPoint = (testTripPointData) => {
  const {basePrice, dataFrom, dataTo, type} = testTripPointData;
  const {name} = testTripPointData.destination;
  const {price, title} = testTripPointData.offers[0];
  return (`
  <li class="trip-events__item">
  <div class="event">
    <time class="event__date" datetime="${dataFrom}">${dayjs(dataFrom).format('DD MMM')}</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${name} ${type}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="${dataFrom}">${dayjs(dataFrom).format('HH:mm')}</time>
        &mdash;
        <time class="event__end-time" datetime="${dataTo}">${dayjs(dataTo).format('HH:mm')}</time>
      </p>
    </div>
    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
    </p>
    <h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
      <li class="event__offer">
        <span class="event__offer-title">${title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${price}</span>
      </li>
    </ul>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
  </li>
  `);
};

export default class TripPointView {
  constructor(testTripPointData) {
    this.testTripPointData = testTripPointData;
  }

  getTemplate() {
    return createTripPoint(this.testTripPointData);
  }

  getElement() {
    if(!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
