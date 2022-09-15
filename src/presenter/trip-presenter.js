import TripPointsContainerView from '../view/trip-points-container-view.js';
import TripPointView from '../view/trip-point-view.js';
import TripPointsSortView from '../view/trip-points-sort-view.js';
import NewTripPointOfferView from '../view/new-trip-point-offer-view';
import NewTripPointDestinationView from '../view/new-trip-point-destination-view.js';
import TripPointEditView from '../view/trip-point-edit-view.js';
import LoadingMessageView from '../view/loading-message-view.js';

import {
  render,
  RenderPosition
} from '../render.js';
import {
  COUNT_OF_TRIP_POINTS
} from '../constants.js';

export default class TripPresenter {
  #tripPointsComponent = new TripPointsContainerView();
  #tripPointSortComponent = new TripPointsSortView();
  #loadingPage = new LoadingMessageView();
  #tripMainContainer = null;

  init(tripMainContainer, TripPointsData) {
    this.#tripMainContainer = tripMainContainer;
    render(this.#tripPointsComponent, this.#tripMainContainer);
    render(
      this.#tripPointSortComponent,
      this.#tripMainContainer,
      RenderPosition.AFTERBEGIN
    );

    for (let i = 0; i < COUNT_OF_TRIP_POINTS; i++) {
      this.#renderPoint(new TripPointView(TripPointsData[i]));
    }

    if (this.#tripPointsComponent.element.childNodes.length <= 0) {
      render(this.#loadingPage, this.#tripMainContainer);
    }
  }

  #renderPoint = (newPoint) => {
    const tripPointEditorComponent = new TripPointEditView(newPoint.tripPointData);

    render(newPoint, this.#tripPointsComponent.element);

    render(new NewTripPointOfferView(newPoint.tripPointData), tripPointEditorComponent.element.querySelector('.event__details'), RenderPosition.AFTERBEGI);

    render(new NewTripPointDestinationView(newPoint.tripPointData), tripPointEditorComponent.element.querySelector('.event__details'));

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        onPointEditorClick(false);
      }
    };

    function onPointEditorClick(isOpenning) {
      if (isOpenning) {
        newPoint.element.replaceWith(tripPointEditorComponent.element);
        document.addEventListener('keydown', onEscKeyDown);
      } else {
        tripPointEditorComponent.element.replaceWith(newPoint.element);
        document.removeEventListener('keydown', onEscKeyDown);
      }
    }
    newPoint.setClickHandler(() => onPointEditorClick(true));

    tripPointEditorComponent.setClickHandler(() => onPointEditorClick(false));

    tripPointEditorComponent.setSubmitHandlerOnForm(() => onPointEditorClick(false));
  };
}
