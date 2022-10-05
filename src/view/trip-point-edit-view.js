import dayjs from 'dayjs';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

const generatePhotosTemplate = (pictures) => pictures.map((picture) => `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`).join('');

const createNewTripPointDestinationTemplate = (destination) => {
  const { description, pictures } = destination;
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

const createNewTripPointOfferTemplate = (offers) => {
  const offersElements = offers.offers;
  return (`
  <section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

    <div class="event__available-offers">
      ${generateOffersTemplate(offersElements)}
    </div>
  </section>
  `);
};

const generateDestinations = (destinations) => {
  let result = '';
  destinations.forEach((destination) => {
    result += `<option value="${destination.name}"></option>`;
  });
  return result;
};

const generateDestinationsDataList = (destinations) => (`
  <datalist id="destination-list-1">
    ${generateDestinations(destinations)}
  </datalist >
  `);

const createTripPointEditTemplate = (tripPointData, offersByType, destinations) => {
  const { basePrice, dateFrom, dateTo, type } = tripPointData;
  const tripOffers = offersByType.find((offer) => offer.type === tripPointData.type);
  const tripDestination = destinations.find((destination) => destination.id === tripPointData.destination);
  const { name } = tripDestination;
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
          ${generateDestinationsDataList(destinations)}
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time event__input--time-start" id="event-start-time-1" type="text" name="event-start-time" value="${dayjs(dateFrom).format('DD/MM/YY HH:mm')}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time event__input--time-end" id="event-end-time-1" type="text" name="event-end-time" value="${dayjs(dateTo).format('DD/MM/YY HH:mm')}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value="${basePrice}" min="1">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
        ${createNewTripPointOfferTemplate(tripOffers)}
        ${createNewTripPointDestinationTemplate(tripDestination)}
      </section>
    </form>
  </li>
  `);
};

export default class TripPointEditView extends AbstractStatefulView {
  #dataToPicker = null;
  #dataFromPicker = null;
  #offersByTypes = null;
  #destinations = null;
  constructor(tripPointData, offersByTypes, destinations) {
    super();
    this.#offersByTypes = offersByTypes;
    this.#destinations = destinations;
    this._setState(TripPointEditView.parsePointToState(tripPointData));
    this.#setInnerHandler();
  }

  removeElement = () => {
    super.removeElement();

    if (this.#dataToPicker) {
      this.#dataToPicker.destroy();
      this.#dataToPicker = null;
    }

    if (this.#dataFromPicker) {
      this.#dataFromPicker.destroy();
      this.#dataFromPicker = null;
    }
  };

  get template() {
    return createTripPointEditTemplate(this._state, this.#offersByTypes, this.#destinations);
  }

  #onDestinationChange = (evt) => {
    const newDestination = evt.target.value;
    this.updateElement({
      destination: this.#destinations.find((destination) => destination.name === newDestination).id
    });
  };

  #onPriceChange = () => {
    this.element.querySelector('.event__input--price').value = this.element.querySelector('.event__input--price').value.replace(/[^0-9]/g, '');
    this.updateElement({
      basePrice: this.element.querySelector('.event__input--price').value
    });
  };

  #onFromTimeChange = ([userDate]) => {
    this.updateElement({
      dateFrom: userDate,
    });
  };

  setSaveClickHandler = (callback) => {
    this._callback.saveClick = callback;
    this.element.querySelector('.event__save-btn').addEventListener('click', this.#formSaveClickHandler);
  };

  #formSaveClickHandler = (evt) => {
    evt.preventDefault();
    document.querySelector('.event__save-btn').textContent = 'Saving...';
    document.querySelector('.event__save-btn').disabled = true;
    this._callback.saveClick(TripPointEditView.parseStateToPoint(this._state));
  };

  setDeleteClickHandler = (callback) => {
    this._callback.deleteClick = callback;
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteClickHandler);
  };

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    document.querySelector('.event__reset-btn').textContent = 'Deleting...';
    document.querySelector('.event__reset-btn').disabled = true;
    this._callback.deleteClick(TripPointEditView.parseStateToPoint(this._state));
  };

  #onToTimeChange = ([userDate]) => {
    this.updateElement({
      dateTo: dayjs(userDate),
    });
  };

  #setInnerHandler() {
    this.element.querySelector('.event__type-group').addEventListener('click', this.#onTypesElementClick);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#onDestinationChange);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#onPriceChange);
    this.#setDataToPicker();
    this.#setDataFromPicker();
  }

  #setDataToPicker = () => {
    this.#dataToPicker = flatpickr(
      this.element.querySelector('.event__input--time-end'),
      {
        minDate: new Date(this._state.dateFrom),
        dateFormat: 'd/m/y H:i',
        defaultDate: this._state.dateTo,
        onChange: this.#onToTimeChange,
        enableTime: true,
        // eslint-disable-next-line camelcase
        time_24hr: true
      },
    );
  };

  #setDataFromPicker = () => {
    this.#dataToPicker = flatpickr(
      this.element.querySelector('.event__input--time-start'),
      {
        dateFormat: 'd/m/y H:i',
        defaultDate: this._state.dateFrom,
        onChange: this.#onFromTimeChange,
        enableTime: true,
        // eslint-disable-next-line camelcase
        time_24hr: true
      },
    );
  };

  setClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#clickHandler);
  };

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };

  #onTypesElementClick = (evt) => {
    const clickedType = evt.target;
    if (!(clickedType.classList.contains('event__type-input'))) {
      return;
    }
    this.updateElement({
      type: clickedType.value
    });
  };

  _restoreHandlers = () => {
    this.setClickHandler(this._callback.click);
    this.setDeleteClickHandler(this._callback.deleteClick);
    this.setSaveClickHandler(this._callback.saveClick);
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
