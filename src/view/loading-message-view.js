import AbstractView from '../framework/view/abstract-view.js';

const createLoadingMessageTemplate = () => (`
  <p class="trip-events__msg">Loading...</p>
  `);

export default class LoadingMessageView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return createLoadingMessageTemplate();
  }
}
