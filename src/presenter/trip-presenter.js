import TripPointsContainerView from '../view/trip-points-container-view.js';
import TripPointView from '../view/trip-point-view.js';
import TripPointsSortView from '../view/trip-points-sort-view.js';
import NewTripPointView from '../view/new-trip-point-view.js';
import NewTripPointOfferView from '../view/new-trip-point-offer-view';
import NewTripPointDestinationView from '../view/new-trip-point-destination-view.js';
import TripPointEditView from '../view/trip-point-edit-view.js';

import {render, RenderPosition} from '../render.js';

const COUNT_OF_TRIP_POINTS = 3;

export default class TripPresenter {
  tripPointsComponent = new TripPointsContainerView();
  tripPointSortComponent = new TripPointsSortView();
  tripPointCreatorComponent = new NewTripPointView();
  tripPointEditorComponent = new TripPointEditView();

  init(tripMainContainer, generateAllTestTripPointsData) {
    const allTestTripPointsData = generateAllTestTripPointsData(COUNT_OF_TRIP_POINTS);
    this.tripMainContainer = tripMainContainer;
    render(this.tripPointsComponent, this.tripMainContainer, RenderPosition.BEFOREEND);
    render(this.tripPointSortComponent, this.tripMainContainer, RenderPosition.AFTERBEGIN);

    for(let i = 0; i < COUNT_OF_TRIP_POINTS; i++) {
      render(new TripPointView(allTestTripPointsData[i]), this.tripPointsComponent.getElement());
    }

    render(this.tripPointCreatorComponent, this.tripPointsComponent.getElement().firstElementChild, RenderPosition.AFTERBEGIN);
    render(this.tripPointEditorComponent, this.tripPointsComponent.getElement().lastElementChild, RenderPosition.BEFOREEND);

    render(new NewTripPointOfferView(), this.tripPointCreatorComponent.getElement().querySelector('.event__details'), RenderPosition.AFTERBEGIN);
    render(new NewTripPointDestinationView(), this.tripPointCreatorComponent.getElement().querySelector('.event__details'), RenderPosition.BEFOREEND);

    render(new NewTripPointOfferView(), this.tripPointEditorComponent.getElement().querySelector('.event__details'), RenderPosition.AFTERBEGIN);
    render(new NewTripPointDestinationView(), this.tripPointEditorComponent.getElement().querySelector('.event__details'), RenderPosition.BEFOREEND);
  }
}
