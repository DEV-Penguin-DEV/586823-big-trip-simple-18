import AbstractView from '../framework/view/abstract-view.js';

const createMainContainerTemplate = () => (`
  <section class="trip-events"></section>
  `);

export default class MainContainerView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return createMainContainerTemplate();
  }
}
