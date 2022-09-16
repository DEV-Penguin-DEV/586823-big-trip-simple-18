import TripPointsContainerView from '../view/trip-points-container-view.js';
import TripPointView from '../view/trip-point-view.js';
import TripPointsSortView from '../view/trip-points-sort-view.js';
import LoadingMessageView from '../view/loading-message-view.js';
import PointPresenter from './point-presenter.js';

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
  #pointsPresentors = new Map();

  init(tripMainContainer, TripPointsData) {
    this.#tripMainContainer = tripMainContainer;

    this.#renderPointsComponent();

    this.#renderPointSortComponent();

    for (let i = 0; i < COUNT_OF_TRIP_POINTS; i++) {
      this.#renderPoint(TripPointsData[i]);
    }

    if (this.#tripPointsComponent.element.childNodes.length <= 0) {
      this.#renderLoadingPage();
    }
  }

  #renderPointsComponent() {
    render(this.#tripPointsComponent, this.#tripMainContainer);
  }

  #renderPointSortComponent() {
    render(this.#tripPointSortComponent, this.#tripMainContainer, RenderPosition.AFTERBEGIN);
  }

  #renderLoadingPage() {
    render(this.#loadingPage, this.#tripMainContainer);
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter(this.#tripPointsComponent);
    pointPresenter.init(new TripPointView(point), this.#resetAllPoints);
    this.#pointsPresentors.set(Number(point.id), pointPresenter);
  }

  #resetAllPoints = () => {
    this.#pointsPresentors.forEach((pointPresentor) => {
      pointPresentor.resetView();
    });
  };
}
