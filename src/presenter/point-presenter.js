import TripPointEditView from '../view/trip-point-edit-view.js';


import { render, RenderPosition } from '../render.js';

export default class PointPresenter {
  #point = null;
  #offersByTypes = null;
  #tripPointsComponent = null;
  #tripPointEditorComponent = null;
  #isEditing = false;
  #isNew = false;
  #resetAllView = null;

  constructor(tripPointsComponent) {
    this.#tripPointsComponent = tripPointsComponent;
  }

  init(point, resetAllView, offersByTypes, isNew = false) {
    this.#isNew = isNew;
    this.#point = point;
    this.#offersByTypes = offersByTypes;
    this.#tripPointEditorComponent = new TripPointEditView(
      this.#point.tripPointData, this.#offersByTypes
    );
    this.#resetAllView = resetAllView;

    this.#resetHandlers();
  }

  #resetHandlers = () => {
    if (!this.#isNew) {
      render(this.#point, this.#tripPointsComponent.element);
      this.#point.setClickHandler(() => this.#onPointEditorClick(true, this.#resetAllView));

      this.#tripPointEditorComponent.setClickHandler(() => this.#onPointEditorClick(false, this.#resetAllView));

      this.#tripPointEditorComponent.setSubmitHandlerOnForm(() =>
        this.#onPointEditorClick(false, this.#resetAllView)
      );
    } else {
      this.#point.setClickHandler(() => this.onNewPointButtonClick(true, this.#resetAllView));

      this.#tripPointEditorComponent.setClickHandler(() => this.onNewPointButtonClick(false, this.#resetAllView));

      this.#tripPointEditorComponent.setSubmitHandlerOnForm(() =>
        this.onNewPointButtonClick(false, this.#resetAllView)
      );
    }
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#onPointEditorClick(false);
    }
  };

  resetView() {
    if (this.#isEditing) {
      if (!this.#isNew) {
        this.#onPointEditorClick(false);
      } else {
        this.onNewPointButtonClick(false);
      }
    }
  }

  #onPointEditorClick(isOpenning, resetViews) {
    if (isOpenning) {
      this.#tripPointEditorComponent = new TripPointEditView(
        this.#point.tripPointData, this.#offersByTypes
      );
      resetViews();
      this.#point.element.replaceWith(this.#tripPointEditorComponent.element);
      this.#resetHandlers();
      document.addEventListener('keydown', this.#onEscKeyDown);
      this.#isEditing = true;
    } else {
      this.#tripPointEditorComponent.element.replaceWith(this.#point.element);
      document.removeEventListener('keydown', this.#onEscKeyDown);
      this.#isEditing = false;
    }
  }

  onNewPointButtonClick(isOpenning, resetViews) {
    if (isOpenning) {
      resetViews();
      render(this.#tripPointEditorComponent, this.#tripPointsComponent.element, RenderPosition.AFTERBEGIN);
      document.addEventListener('keydown', this.#onEscKeyDown);
      this.#isEditing = true;
    } else {
      this.#tripPointEditorComponent.element.replaceWith('');
      document.removeEventListener('keydown', this.#onEscKeyDown);
      this.#isEditing = false;
    }
  }
}
