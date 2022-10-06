import TripPointEditView from '../view/trip-point-edit-view.js';


import { render, remove } from '../framework/render';
import { UserAction, UpdateType } from '../constants.js';
import { isEscape } from '../utils.js';

export default class PointPresenter {
  #point = null;
  #offersByTypes = null;
  #destinations = null;
  #tripPointsComponent = null;
  #tripPointEditorComponent = null;
  #isEditing = false;
  #resetAllView = null;
  #handlePointChange = null;

  constructor(tripPointsComponent) {
    this.#tripPointsComponent = tripPointsComponent;
  }

  destroy = () => {
    remove(this.#point);
    remove(this.#tripPointEditorComponent);
  };

  init(point, offersByTypes, destinations, resetAllView, handlePointChange) {
    this.#point = point;
    this.#destinations = destinations;
    this.#offersByTypes = offersByTypes;
    this.#handlePointChange = handlePointChange;
    this.#tripPointEditorComponent = new TripPointEditView(
      this.#point.tripPointData, this.#offersByTypes, this.#destinations
    );
    this.#resetAllView = resetAllView;
    render(this.#point, this.#tripPointsComponent.element);
    this.#resetHandlers();
  }

  #resetHandlers = () => {
    this.#point.setClickHandler(() => this.#onPointEditorClick(true, this.#resetAllView));

    this.#tripPointEditorComponent.setClickHandler(() => this.#onPointEditorClick(false));

    this.#tripPointEditorComponent.setDeleteClickHandler(this.#handleDeleteClick);

    this.#tripPointEditorComponent.setSaveClickHandler(this.#handleSaveClick);
  };

  #onEscKeyDown = (evt) => {
    if (isEscape(evt)) {
      evt.preventDefault();
      this.#onPointEditorClick(false);
    }
  };

  resetView() {
    if (this.#isEditing) {
      this.#onPointEditorClick(false);
    }
  }

  #onPointEditorClick(isOpenning, resetViews = null) {
    if (isOpenning) {
      this.#tripPointEditorComponent = new TripPointEditView(
        this.#point.tripPointData, this.#offersByTypes, this.#destinations
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

  #handleDeleteClick = (point) => {
    this.#handlePointChange(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point,
    );
  };

  #handleSaveClick = (point) => {
    this.#handlePointChange(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      point,
    );
    this.#onPointEditorClick(false);
  };
}
