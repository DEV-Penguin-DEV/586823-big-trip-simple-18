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
import dayjs from 'dayjs';

export default class TripPresenter {
  #tripPointsComponent = new TripPointsContainerView();
  #tripPointSortComponent = new TripPointsSortView();
  #loadingPage = new LoadingMessageView();
  #tripMainContainer = null;
  #pointsPresentors = new Map();
  #pointsViews = [];
  #checkedSortType = 'price';
  #tripPointsData = null;

  init(tripMainContainer, tripPointsData) {
    this.#tripMainContainer = tripMainContainer;
    this.#tripPointsData = tripPointsData;

    this.#renderPointsComponent();

    this.#renderPointSortComponent();

    for (let i = 0; i < COUNT_OF_TRIP_POINTS; i++) {
      this.#renderPoint(this.#tripPointsData[i]);
    }

    this.#sorting(null, true);

    if (this.#tripPointsComponent.element.childNodes.length <= 0) {
      this.#renderLoadingPage();
    }
  }

  #renderPointsComponent() {
    render(this.#tripPointsComponent, this.#tripMainContainer);
  }

  #renderPointSortComponent() {
    render(this.#tripPointSortComponent, this.#tripMainContainer, RenderPosition.AFTERBEGIN);
    this.#tripPointSortComponent.setClickHandler(this.#sorting);
  }

  #sorting = (evt, isDefaultSorting = false) => {
    let sortType = null;

    if (isDefaultSorting) {
      sortType = this.#checkedSortType;
    } else {
      const typeInput = evt.target;
      sortType = typeInput.dataset.sortType;
      if (sortType === this.#checkedSortType) {
        return;
      }
    }


    this.#checkedSortType = sortType;

    switch (this.#checkedSortType) {
      case 'day':
        this.#daySorting();
        break;

      case 'event':
        this.#eventSorting();
        break;

      case 'time':
        this.#timeSorting();
        break;

      case 'price':
        this.#priceSorting();
        break;

      case 'offers':
        this.#offersSorting();
        break;
    }
  };

  #daySorting() {
    const sortedPointsViews = this.#pointsViews.slice(0);
    sortedPointsViews.sort((a, b) => {
      const aDay = a.element.querySelector('.event__date').textContent.replace(/[^\d]/g, '');
      const bDay = b.element.querySelector('.event__date').textContent.replace(/[^\d]/g, '');
      return aDay - bDay;
    });
    this.#renderSort(sortedPointsViews);
  }

  #eventSorting() {
    const sortedPointsViews = this.#pointsViews.slice(0);
    // event sorting
    this.#renderSort(sortedPointsViews);
  }

  #timeSorting() {
    const sortedPointsViews = this.#pointsViews.slice(0);
    sortedPointsViews.sort((a, b) => {
      const aTime = dayjs(a.element.querySelector('.event__end-time').dateTime).diff(a.element.querySelector('.event__start-time').dateTime);
      const bTime = dayjs(b.element.querySelector('.event__end-time').dateTime).diff(b.element.querySelector('.event__start-time').dateTime);
      return aTime >= bTime;
    });
    this.#renderSort(sortedPointsViews);
  }

  #priceSorting() {
    const sortedPointsViews = this.#pointsViews.slice(0);
    sortedPointsViews.sort((a, b) => {
      const aPrice = a.element.querySelector('.event__price-value').textContent;
      const bPrice = b.element.querySelector('.event__price-value').textContent;
      return bPrice - aPrice;
    });
    this.#renderSort(sortedPointsViews);
  }

  #offersSorting() {
    const sortedPointsViews = this.#pointsViews.slice(0);
    sortedPointsViews.sort((a, b) => {
      const aOffers = a.element.dataset.offersCount;
      const bOffers = b.element.dataset.offersCount;
      return bOffers - aOffers;
    });
    this.#renderSort(sortedPointsViews);
  }

  #renderSort(sortedPoints) {
    while (this.#tripPointsComponent.firstChild) {
      this.#tripPointsComponent.removeChild(this.#tripPointsComponent.firstChild);
    }
    sortedPoints.forEach((point) => {
      render(point, this.#tripPointsComponent.element);
    });
  }

  #renderLoadingPage() {
    render(this.#loadingPage, this.#tripMainContainer);
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter(this.#tripPointsComponent);
    const pointView = new TripPointView(point);
    pointPresenter.init(pointView, this.#resetAllPoints);
    this.#pointsViews.push(pointView);
    this.#pointsPresentors.set(Number(point.id), pointPresenter);
  }

  #resetAllPoints = () => {
    this.#pointsPresentors.forEach((pointPresentor) => {
      pointPresentor.resetView();
    });
  };
}
