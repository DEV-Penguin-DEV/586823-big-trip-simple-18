import {createElement} from '../render.js';

const createTripPointsContainerTemplate = () =>
  (`
    <ul class="trip-events__list"></ul>
  `);

export default class TripPointsContainerView {
  #element = null;

  get template() {
    return createTripPointsContainerTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
