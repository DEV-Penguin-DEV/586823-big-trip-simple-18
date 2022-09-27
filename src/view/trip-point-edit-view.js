import dayjs from 'dayjs';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

const generatePhotosTemplate = (pictures) => pictures.map((picture) => `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`).join('');

const createNewTripPointDestinationTemplate = (tripPointData) => {
  const { description, pictures } = tripPointData.destination;
  return (`
  <section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${description}</p>

    <div class="event__photos-container">
      <div class="event__photos-tape">
    ${generatePhotosTemplate(pictures)}
      </div>
    </div>
  </section>
  `);
};

const generateOffersTemplate = (offers) => {
  let result = '';
  offers.forEach((offer, i) => {
    result += `
      <div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.title.replaceAll(' ', '-')}-${i}" type="checkbox" name="event-offer-luggage">
        <label class="event__offer-label" for="event-offer-${offer.title.replaceAll(' ', '-')}-${i}" data-id="${offer.id}">
          <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </label>
      </div>`;
  });
  return result;
};

const createNewTripPointOfferTemplate = (tripPointData) => {
  const offers = tripPointData.offers;
  return (`
  <section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

    <div class="event__available-offers">
      ${generateOffersTemplate(offers)}
    </div>
  </section>
  `);
};

const createTripPointEditTemplate = (tripPointData) => {
  const { basePrice, dateFrom, dateTo, type } = tripPointData;
  const { name } = tripPointData.destination;
  return (`
  <li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>

              <div class="event__type-item">
                <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi" ${type === 'taxi' ? 'checked' : ''}>
                <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus" ${type === 'bus' ? 'checked' : ''}>
                <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train" ${type === 'train' ? 'checked' : ''}>
                <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship" ${type === 'ship' ? 'checked' : ''}>
                <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive" ${type === 'drive' ? 'checked' : ''}>
                <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" ${type === 'flight' ? 'checked' : ''}>
                <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in" ${type === 'check-in' ? 'checked' : ''}>
                <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing" ${type === 'sightseeing' ? 'checked' : ''}>
                <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant" ${type === 'restaurant' ? 'checked' : ''}>
                <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
              </div>
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${type}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${name}" list="destination-list-1">
          <datalist id="destination-list-1">
            <option value="Amsterdam"></option>
            <option value="Geneva"></option>
            <option value="Chamonix"></option>
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dayjs(dateFrom).format('DD/MM/YY HH:mm')}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dayjs(dateTo).format('DD/MM/YY HH:mm')}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}" readonly>
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
      ${createNewTripPointOfferTemplate(tripPointData)}
      ${createNewTripPointDestinationTemplate(tripPointData)}
      </section>
    </form>
  </li>
  `);
};

export default class TripPointEditView extends AbstractStatefulView {
  #dataPicker = null;
  #offersByTypes = null;
  constructor(tripPointData, offersByTypes) {
    super();
    this.#offersByTypes = offersByTypes;
    this._setState(TripPointEditView.parsePointToState(tripPointData));
    this.#setInnerHandler();
  }

  removeElement = () => {
    super.removeElement();

    if (this.#dataPicker) {
      this.#dataPicker.destroy();
      this.#dataPicker = null;
    }
  };

  get template() {
    return createTripPointEditTemplate(this._state);
  }

  #onDestinationChange = (evt) => {
    const newDestination = this._state.destination;
    newDestination.name = evt.target.value;
    this.updateElement({
      destination: newDestination
    });
  };

  #setInnerHandler() {
    this.element.querySelector('.event__type-group').addEventListener('click', this.#onTypesElementClick);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#onDestinationChange);
  }

  setClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#clickHandler);
  };

  setSubmitHandlerOnForm = (callback) => {
    this._callback.submit = callback;
    this.element.querySelector('.event--edit').addEventListener('submit', this.#submitHandler);
  };

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };

  #submitHandler = (evt) => {
    evt.preventDefault();
    this._callback.submit();
  };

  #onTypesElementClick = (evt) => {
    const clickedType = evt.target;
    if (!(clickedType.classList.contains('event__type-input'))) {
      return;
    }
    this.updateElement({
      type: clickedType.value,
      offers: this.#offersByTypes[clickedType.value],
    });
  };

  _restoreHandlers = () => {
    this.setClickHandler(this._callback.click);
    this.setSubmitHandlerOnForm(this._callback.submit);
    this.#setInnerHandler();
  };

  static parsePointToState = (point) => ({
    ...point
  });

  static parseStateToPoint = (state) => {
    const point = { ...state };
    return point;
  };
}
