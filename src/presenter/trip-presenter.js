import TripPointsContainerView from '../view/trip-points-container-view.js';
import TripPointView from '../view/trip-point-view.js';
import TripPointsSortView from '../view/trip-points-sort-view.js';
import LoadingMessageView from '../view/loading-message-view.js';
import PointPresenter from './point-presenter.js';
import NewPointPresenter from './new-point-presenter.js';

import {
  render,
  RenderPosition
} from '../render.js';
import { SortType, UpdateType, UserAction, DEFAULT_SORT_TYPE } from '../constants.js';
import dayjs from 'dayjs';

export default class TripPresenter {
  #tripPointsComponent = new TripPointsContainerView();
  #tripPointSortComponent = new TripPointsSortView();
  #loadingPage = new LoadingMessageView();
  #tripMainContainer = null;
  #pointsPresentors = new Map();
  #checkedSortType = DEFAULT_SORT_TYPE;
  #model = null;

  constructor(tripMainContainer, model) {
    this.#tripMainContainer = tripMainContainer;
    this.#model = model;
    model.addObserver(this.#handleModelEvent);
  }

  get points() {
    switch (this.#checkedSortType) {
      case SortType.EVENT:
        return this.#eventSorting();

      case SortType.DAY:
        return this.#dateSorting();

      case SortType.TIME:
        return this.#timeSorting();

      case SortType.PRICE:
        return this.#priceSorting();

      case SortType.OFFERS:
        return this.#offersSorting();
    }

    return this.#model.tripPoints;
  }

  init() {
    this.#renderBoard();
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#model.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#model.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#model.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointsPresentors.get(Number(data.id)).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearPoints();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearPoints();
        this.#renderBoard();
        break;
    }
  };

  #renderPointsComponent() {
    render(this.#tripPointsComponent, this.#tripMainContainer);
    this.#renderPoints(this.points);

    if (this.#tripPointsComponent.element.childNodes.length <= 0) {
      this.#renderLoadingPage();
    }
  }

  #renderPointSortComponent() {
    render(this.#tripPointSortComponent, this.#tripMainContainer, RenderPosition.AFTERBEGIN);
    this.#tripPointSortComponent.setClickHandler(this.#sorting);
  }

  #sorting = (evt, isDefaultSorting = false) => {
    let sortType = null;

    if (isDefaultSorting) {
      sortType = DEFAULT_SORT_TYPE;
    } else {
      const typeInput = evt.target;
      sortType = typeInput.dataset.sortType;
      if (sortType === this.#checkedSortType) {
        return;
      }
    }
    this.#checkedSortType = sortType;
    this.#renderSort(this.points);
  };

  #eventSorting() {
    // event sorting
    return this.#model.tripPoints;
  }

  #dateSorting() {
    return [...this.#model.tripPoints].sort((a, b) => {
      const aDate = a.dateFrom;
      const bDate = b.dateFrom;
      return aDate - bDate;
    });
  }

  #timeSorting() {
    return [...this.#model.tripPoints].sort((a, b) => {
      const aTime = dayjs(a.dateTo).diff(a.dateFrom);
      const bTime = dayjs(b.dateTo).diff(b.dateFrom);
      return aTime >= bTime;
    });
  }

  #priceSorting() {
    return [...this.#model.tripPoints].sort((a, b) => {
      const aPrice = a.basePrice;
      const bPrice = b.basePrice;
      return bPrice - aPrice;
    });
  }

  #offersSorting() {
    return [...this.#model.tripPoints].sort((a, b) => {
      const aOffers = a.offers.length;
      const bOffers = b.offers.length;
      return bOffers - aOffers;
    });
  }

  #renderSort() {
    this.#clearPoints();
    this.#renderPoints(this.points);
    this.#setNewTripPointButton();
  }

  #renderLoadingPage() {
    render(this.#loadingPage, this.#tripMainContainer);
  }

  #clearPoints = () => {
    this.#pointsPresentors.forEach((presenter) => presenter.destroy());
    this.#pointsPresentors.clear();
    document.querySelector('.trip-main__event-add-btn').removeEventListener('click', this.#onAddButtonClick);
  };

  #onAddButtonClick = () => {
    this.#sorting(null, true);
    const points = this.points.slice(0);
    const point = JSON.parse(JSON.stringify(points[points.length - 1]));
    point.id = Math.round(Math.random * 100);
    const newTripPointPresenter = new NewPointPresenter(this.#tripPointsComponent);
    newTripPointPresenter.init(new TripPointView(point), this.#model.offersByTypes, this.#model.destinations, this.#resetAllPoints, this.#handleViewAction, this.#pointsPresentors);
    newTripPointPresenter.onNewPointButtonClick(true, this.#resetAllPoints);
    this.#pointsPresentors.set(Number(point.id), newTripPointPresenter);
  };

  #setNewTripPointButton() {
    document.querySelector('.trip-main__event-add-btn').addEventListener('click', this.#onAddButtonClick);
  }

  #renderPoints(points) {
    points.forEach((point) => {
      this.#renderPoint(point);
    });
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter(this.#tripPointsComponent);
    const pointView = new TripPointView(point);
    pointPresenter.init(pointView, this.#model.offersByTypes, this.#model.destinations, this.#resetAllPoints, this.#handleViewAction);
    this.#pointsPresentors.set(Number(point.id), pointPresenter);
  }

  #renderBoard() {
    this.#renderPointsComponent();

    this.#renderPointSortComponent();

    this.#setNewTripPointButton();

    this.#sorting(null, true);
  }

  #resetAllPoints = () => {
    this.#pointsPresentors.forEach((pointPresentor) => {
      pointPresentor.resetView();
    });
  };
}
