import AbstractView from '../framework/view/abstract-view.js';

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

export default class NewTripPointDestinationView extends AbstractView {
  #tripPointData = null;
  constructor(tripPointData) {
    super();
    this.#tripPointData = tripPointData;
  }

  get template() {
    return createNewTripPointDestinationTemplate(this.#tripPointData);
  }
}
