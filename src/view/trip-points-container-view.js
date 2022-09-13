import AbstractView from '../framework/view/abstract-view.js';

const createTripPointsContainerTemplate = () => (`
    <ul class="trip-events__list"></ul>
  `);

export default class TripPointsContainerView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return createTripPointsContainerTemplate();
  }
}
