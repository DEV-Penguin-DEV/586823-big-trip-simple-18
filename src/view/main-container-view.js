import {createElement} from '../render.js';

const createMainContainerTemplate = () =>
  (`
  <section class="trip-events"></section>
  `);

export default class MainContainerView {
  #element = null;

  get template() {
    return createMainContainerTemplate();
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
