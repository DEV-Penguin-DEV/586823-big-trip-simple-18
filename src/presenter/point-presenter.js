import TripPointEditView from '../view/trip-point-edit-view.js';


import { render, RenderPosition } from '../render.js';

export default class PointPresenter {
  #point = null;
  #offersByTypes = null;
  #tripPointsComponent = null;
  #tripPointEditorComponent = null;
  #isEditing = false;
  #isNew = false;

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

    if (!this.#isNew) {
      render(this.#point, this.#tripPointsComponent.element);
      this.#point.setClickHandler(() => this.#onPointEditorClick(true, resetAllView));

      this.#tripPointEditorComponent.setClickHandler(() => this.#onPointEditorClick(false, resetAllView));

      this.#tripPointEditorComponent.setSubmitHandlerOnForm(() =>
        this.#onPointEditorClick(false, resetAllView)
      );
    } else {
      this.#point.setClickHandler(() => this.onNewPointButtonClick(true, resetAllView));

      this.#tripPointEditorComponent.setClickHandler(() => this.onNewPointButtonClick(false, resetAllView));

      this.#tripPointEditorComponent.setSubmitHandlerOnForm(() =>
        this.onNewPointButtonClick(false, resetAllView)
      );
    }


  }

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#onPointEditorClick(false);
    }
  };

  _resetView() {
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
