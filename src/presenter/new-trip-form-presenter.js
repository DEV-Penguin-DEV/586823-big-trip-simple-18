import TripPointEditView from '../view/trip-point-edit-view.js';


import { render, RenderPosition } from '../render.js';

export default class NewTripPointPresenter {
  #point = null;
  #offersByTypes = null;
  #tripPointsComponent = null;
  #newTripPointComponent = null;
  #isOpening = false;

  constructor(tripPointsComponent) {
    this.#tripPointsComponent = tripPointsComponent;
  }

  init(point, resetAllView, offersByTypes) {
    this.#point = point;
    this.#offersByTypes = offersByTypes;
    this.#newTripPointComponent = new TripPointEditView(
      this.#point.tripPointData, this.#offersByTypes
    );

    this.#newTripPointComponent.setClickOpenHandler(() => this.#onNewPointClick(true, resetAllView));
    this.#newTripPointComponent.setClickCloseHandler(() => this.#onNewPointClick(false, resetAllView));
    this.#newTripPointComponent.setSubmitHandlerOnForm(() =>
      this.#onNewPointClick(false, resetAllView)
    );

  }

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#onNewPointClick(false);
    }
  };

  _resetView() {
    if (this.#isOpening) {
      this.#onNewPointClick(false);
    }
  }

  #onNewPointClick(isOpenning, resetViews) {
    if (isOpenning) {
      resetViews();
      render(this.#newTripPointComponent, this.#tripPointsComponent.element, RenderPosition.AFTERBEGIN);
      document.addEventListener('keydown', this.#onEscKeyDown);
      this.#isOpening = true;
    } else {
      this.#newTripPointComponent.removeElement();
      document.removeEventListener('keydown', this.#onEscKeyDown);
      this.#isOpening = false;
    }
  }
}
