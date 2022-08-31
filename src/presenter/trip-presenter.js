import TripPointsContainerView from '../view/trip-points-container-view.js';
import TripPointView from '../view/trip-point-view.js';
import TripPointsSortView from '../view/trip-points-sort-view.js';
import NewTripPointView from '../view/new-trip-point-view.js';
import NewTripPointOfferView from '../view/new-trip-point-offer-view';
import NewTripPointDestinationView from '../view/new-trip-point-destination-view.js';
import TripPointEditView from '../view/trip-point-edit-view.js';

import {
  render,
  RenderPosition
} from '../render.js';
import {
  COUNT_OF_TRIP_POINTS
} from '../constants.js';

export default class TripPresenter {
  tripPointsComponent = new TripPointsContainerView();
  tripPointSortComponent = new TripPointsSortView();
  tripPointCreatorComponent = new NewTripPointView();

  init(tripMainContainer, TripPointsData) {
    this.tripMainContainer = tripMainContainer;
    render(this.tripPointsComponent, this.tripMainContainer);
    render(this.tripPointSortComponent, this.tripMainContainer, RenderPosition.AFTERBEGIN);

    for (let i = 0; i < COUNT_OF_TRIP_POINTS; i++) {
      const newTrip = new TripPointView(TripPointsData[i]);
      const tripPointEditorComponent = new TripPointEditView();
      const pointEditorOpenerElement = newTrip.getElement().querySelector('.event__rollup-btn');
      const pointEditorCloserElement = tripPointEditorComponent.getElement().querySelector('.event__rollup-btn');
      const pointEditorFormElement = tripPointEditorComponent.getElement().querySelector('.event--edit');

      render(newTrip, this.tripPointsComponent.getElement());

      render(new NewTripPointOfferView(), tripPointEditorComponent.getElement().querySelector('.event__details'), RenderPosition.AFTERBEGIN);
      render(new NewTripPointDestinationView(), tripPointEditorComponent.getElement().querySelector('.event__details'));

      const onEscKeyDown = (evt) => {
        if (evt.key === 'Escape' || evt.key === 'Esc') {
          evt.preventDefault();
          tripPointEditorComponent.getElement().replaceWith(newTrip.getElement());
          document.removeEventListener('keydown', onEscKeyDown);
        }
      };

      pointEditorOpenerElement.addEventListener('click', () => {
        newTrip.getElement().replaceWith(tripPointEditorComponent.getElement());
        document.addEventListener('keydown', onEscKeyDown);
      });

      pointEditorCloserElement.addEventListener('click', () => {
        tripPointEditorComponent.getElement().replaceWith(newTrip.getElement());
        document.removeEventListener('keydown', onEscKeyDown);

      });
      pointEditorFormElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
        tripPointEditorComponent.getElement().replaceWith(newTrip.getElement());
        document.removeEventListener('keydown', onEscKeyDown);
      });
    }
  }
}
