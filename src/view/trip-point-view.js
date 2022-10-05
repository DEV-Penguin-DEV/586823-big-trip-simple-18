/* eslint-disable camelcase */
import dayjs from 'dayjs';
import AbstractView from '../framework/view/abstract-view.js';

const createTripPoint = (tripPointData, offersByType, destinations) => {
  const { basePrice, dateFrom, dateTo, type } = tripPointData;
  const tripOffers = offersByType.find((offer) => offer.type === tripPointData.type);
  const tripDestination = destinations.find((destination) => destination.id === tripPointData.destination);
  const { name } = tripDestination;
  const { price, title } = tripOffers.offers.length > 0 ? tripOffers.offers[0] : { price: 0, title: '' };
  return (`
  <li class="trip-events__item">
  <div class="event">
    <time class="event__date" datetime="${dateFrom}">${dayjs(dateFrom).format('DD MMM')}</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${type} ${name}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="${dateFrom}">${dayjs(dateFrom).format('HH:mm')}</time>
        &mdash;
        <time class="event__end-time" datetime="${dateTo}">${dayjs(dateTo).format('HH:mm')}</time>
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

export default class TripPointView extends AbstractView {
  #tripPointData = null;
  #offersByTypes = null;
  #destinations = null;
  constructor(tripPointData, offersByTypes, destinations) {
    super();
    this.#offersByTypes = offersByTypes;
    this.#destinations = destinations;
    this.#tripPointData = tripPointData;
  }

  get template() {
    return createTripPoint(this.#tripPointData, this.#offersByTypes, this.#destinations);
  }

  get tripPointData() {
    return this.#tripPointData;
  }

  setClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#clickHandler);
  };

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };
}
