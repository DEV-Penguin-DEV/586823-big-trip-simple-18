import AbstractView from '../framework/view/abstract-view.js';

const generateOffers = (offers) => {
  let result = '';
  offers.forEach((offer) => {
    result += `
      <div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage">
        <label class="event__offer-label" for="event-offer-luggage-1">
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
      ${generateOffers(offers)}
    </div>
  </section>
  `);
};

export default class NewTripPointOfferView extends AbstractView {
  #tripPointData = null;
  constructor(tripPointData) {
    super();
    this.#tripPointData = tripPointData;
  }

  get template() {
    return createNewTripPointOfferTemplate(this.#tripPointData);
  }
}
