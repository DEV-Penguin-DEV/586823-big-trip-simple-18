import {createElement} from '../render.js';

const createTripPointsContainerTemplate = () =>
  (`
    <ul class="trip-events__list"></ul>
  `);

export default class TripPointsContainerView {
  getTemplate() {
    return createTripPointsContainerTemplate();
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
