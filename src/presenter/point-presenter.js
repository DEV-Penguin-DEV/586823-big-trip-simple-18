import NewTripPointOfferView from '../view/new-trip-point-offer-view';
import NewTripPointDestinationView from '../view/new-trip-point-destination-view.js';
import TripPointEditView from '../view/trip-point-edit-view.js';

import { render, RenderPosition } from '../render.js';

export default class PointPresenter {
  #point = null;
  #tripPointsComponent = null;
  #tripPointEditorComponent = null;
  #isEditing = false;

  constructor(tripPointsComponent) {
    this.#tripPointsComponent = tripPointsComponent;
  }

  init(point, resetAllView) {
    resetAllView();
    this.#point = point;

    this.#tripPointEditorComponent = new TripPointEditView(
      this.#point.tripPointData
    );

    render(this.#point, this.#tripPointsComponent.element);

    render(new NewTripPointOfferView(this.#point.tripPointData), this.#tripPointEditorComponent.element.querySelector('.event__details'), RenderPosition.AFTERBEGI
    );

    render(
      new NewTripPointDestinationView(this.#point.tripPointData),
      this.#tripPointEditorComponent.element.querySelector('.event__details')
    );

    this.#point.setClickHandler(() => this.onPointEditorClick(true, resetAllView));

    this.#tripPointEditorComponent.setClickHandler(() => this.onPointEditorClick(false, resetAllView));

    this.#tripPointEditorComponent.setSubmitHandlerOnForm(() =>
      this.onPointEditorClick(false, resetAllView)
    );
  }

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.onPointEditorClick(false);
    }
  };

  resetView() {
    if (this.#isEditing) {
      this.onPointEditorClick(false);
    }
  }

  onPointEditorClick(isOpenning, resetViews) {
    if (isOpenning) {
      resetViews();
      this.#point.element.replaceWith(this.#tripPointEditorComponent.element);
      document.addEventListener('keydown', this.#onEscKeyDown);
      this.#isEditing = true;
    } else {
      this.#tripPointEditorComponent.element.replaceWith(this.#point.element);
      document.removeEventListener('keydown', this.#onEscKeyDown);
      this.#isEditing = false;
    }
  }


}
