import TripPointsContainerView from '../view/trip-points-container-view.js';
import TripPointView from '../view/trip-point-view.js';
import TripPointsSortView from '../view/trip-points-sort-view.js';
import NewTripPointView from '../view/new-trip-point-view.js';
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
  #tripPointCreatorComponent = new NewTripPointView();
  #loadingPage = new LoadingMessageView();
  #tripMainContainer = null;

  init(tripMainContainer, TripPointsData) {
    this.#tripMainContainer = tripMainContainer;
    render(this.#tripPointsComponent, this.#tripMainContainer);
    render(this.#tripPointSortComponent, this.#tripMainContainer, RenderPosition.AFTERBEGIN);

    for (let i = 0; i < COUNT_OF_TRIP_POINTS; i++) {
      this.#renderPoint(new TripPointView(TripPointsData[i]));
    }

    if(!(this.#tripPointsComponent.childNodes)) {
      render(this.#loadingPage, this.#tripMainContainer);
    }
  }

  #renderPoint = (newPoint) => {
    const tripPointEditorComponent = new TripPointEditView();
    const pointEditorOpenerElement = newPoint.element.querySelector('.event__rollup-btn');
    const pointEditorCloserElement = tripPointEditorComponent.element.querySelector('.event__rollup-btn');
    const pointEditorFormElement = tripPointEditorComponent.element.querySelector('.event--edit');

    render(newPoint, this.#tripPointsComponent.element);

    render(new NewTripPointOfferView(), tripPointEditorComponent.element.querySelector('.event__details'), RenderPosition.AFTERBEGIN);
    render(new NewTripPointDestinationView(), tripPointEditorComponent.element.querySelector('.event__details'));

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        tripPointEditorComponent.element.replaceWith(newPoint.element);
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    pointEditorOpenerElement.addEventListener('click', () => {
      newPoint.element.replaceWith(tripPointEditorComponent.element);
      document.addEventListener('keydown', onEscKeyDown);
    });

    pointEditorCloserElement.addEventListener('click', () => {
      tripPointEditorComponent.element.replaceWith(newPoint.element);
      document.removeEventListener('keydown', onEscKeyDown);
    });

    pointEditorFormElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      tripPointEditorComponent.element.replaceWith(newPoint.element);
      document.removeEventListener('keydown', onEscKeyDown);
    });
  };
}
