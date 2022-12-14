import TripPointEditView from '../view/trip-point-edit-view.js';

import { render, RenderPosition, remove } from '../framework/render';
import { UserAction, UpdateType } from '../constants.js';
import { isEscape } from '../utils.js';

export default class NewPointPresenter {
  #point = null;
  #offersByTypes = null;
  #destinations = null;
  #tripPointsComponent = null;
  #tripPointEditorComponent = null;
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
    this.#tripPointEditorComponent = new TripPointEditView(this.#point.tripPointData, this.#offersByTypes, this.#destinations);
    this.#handlePointChange = handlePointChange;
    this.#resetAllView = resetAllView;
    this.#resetHandlers();
  }

  #resetHandlers = () => {
    this.#point.setClickHandler(() => this.onNewPointButtonClick(true, this.#resetAllView));

    this.#tripPointEditorComponent.setClickHandler(() => this.onNewPointButtonClick(false));

    this.#tripPointEditorComponent.setSaveClickHandler(this.#handleAddClick);
    this.#tripPointEditorComponent.setDeleteClickHandler(() => this.onNewPointButtonClick(false));
  };

  #onEscKeyDown = (evt) => {
    if (isEscape(evt)) {
      evt.preventDefault();
      this.onNewPointButtonClick(false);
    }
  };

  resetView() {
    this.onNewPointButtonClick(false);
  }

  onNewPointButtonClick(isOpenning, resetViews = null) {
    if (isOpenning) {
      resetViews();
      render(this.#tripPointEditorComponent, this.#tripPointsComponent.element, RenderPosition.AFTERBEGIN);
      document.addEventListener('keydown', this.#onEscKeyDown);
      document.querySelector('.trip-main__event-add-btn').disabled = true;
    } else {
      this.destroy();
      document.removeEventListener('keydown', this.#onEscKeyDown);
      document.querySelector('.trip-main__event-add-btn').disabled = false;
    }
  }

  #handleAddClick = (point) => {
    document.querySelector('.event__save-btn').textContent = 'Saving...';
    document.querySelector('.event__save-btn').disabled = true;
    this.#handlePointChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      point,
    );
    this.onNewPointButtonClick(false);
  };
}
