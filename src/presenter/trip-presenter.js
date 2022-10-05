import TripPointsContainerView from '../view/trip-points-container-view.js';
import TripPointView from '../view/trip-point-view.js';
import TripPointsSortView from '../view/trip-points-sort-view.js';
import LoadingMessageView from '../view/loading-message-view.js';
import PointPresenter from './point-presenter.js';
import NewPointPresenter from './new-point-presenter.js';
import FilterView from '../view/filter-view.js';
import FilterPresenter from './filter-presenter.js';

import {
  render,
  RenderPosition
} from '../render.js';
import { SortType, UpdateType, UserAction, DEFAULT_SORT_TYPE } from '../constants.js';
import dayjs from 'dayjs';

export default class TripPresenter {
  #tripPointsComponent = new TripPointsContainerView();
  #tripPointSortComponent = new TripPointsSortView();
  #tripMainContainer = null;
  #pointsPresentors = new Map();
  #checkedSortType = DEFAULT_SORT_TYPE;
  #model = null;
  #filerComponent = new FilterView();
  #filterPresenter = null;

  constructor(tripMainContainer, model) {
    this.#tripMainContainer = tripMainContainer;
    this.#model = model;
    this.#filterPresenter = new FilterPresenter(this.#model, this.#renderSort, this.#filerComponent);
    model.addObserver(this.#handleModelEvent);
  }

  get points() {
    const filtredPoints = this.#filterPresenter.filtring(true);
    switch (this.#checkedSortType) {
      case SortType.EVENT:
        return this.#eventSorting(filtredPoints);

      case SortType.DAY:
        return this.#dateSorting(filtredPoints);

      case SortType.TIME:
        return this.#timeSorting(filtredPoints);

      case SortType.PRICE:
        return this.#priceSorting(filtredPoints);

      case SortType.OFFERS:
        return this.#offersSorting(filtredPoints);
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
        this.clearPoints();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.clearPoints();
        this.#renderBoard();
        break;
      case UpdateType.INIT:
        this.clearPoints();
        this.#renderBoard();
        if (document.querySelector('.trip-events__msg') !== null) {
          document.querySelector('.trip-events__msg').remove();
        }
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
      document.querySelector('#sort-day').checked = true;
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

  #eventSorting(filtredPoints) {
    // event sorting
    return filtredPoints;
  }

  #dateSorting(filtredPoints) {
    return filtredPoints.sort((a, b) => {
      const aDate = a.dateFrom;
      const bDate = b.dateFrom;
      return aDate - bDate;
    });
  }

  #timeSorting(filtredPoints) {
    return filtredPoints.sort((a, b) => {
      const aTime = dayjs(a.dateTo).diff(a.dateFrom);
      const bTime = dayjs(b.dateTo).diff(b.dateFrom);
      return aTime >= bTime;
    });
  }

  #priceSorting(filtredPoints) {
    return filtredPoints.sort((a, b) => {
      const aPrice = a.basePrice;
      const bPrice = b.basePrice;
      return bPrice - aPrice;
    });
  }

  #offersSorting(filtredPoints) {
    return filtredPoints.sort((a, b) => {
      const aOffers = a.offers.length;
      const bOffers = b.offers.length;
      return bOffers - aOffers;
    });
  }

  #renderSort = (points) => {
    this.clearPoints();
    this.#renderPoints(points);
    this.#setNewTripPointButton();
  };

  #renderLoadingPage() {
    render(new LoadingMessageView(), this.#tripMainContainer);
  }

  clearPoints = () => {
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
    newTripPointPresenter.init(new TripPointView(point, this.#model.offersByTypes, this.#model.destinations), this.#model.offersByTypes, this.#model.destinations, this.#resetAllPoints, this.#handleViewAction);
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
    const pointView = new TripPointView(point, this.#model.offersByTypes, this.#model.destinations);
    pointPresenter.init(pointView, this.#model.offersByTypes, this.#model.destinations, this.#resetAllPoints, this.#handleViewAction);
    this.#pointsPresentors.set(Number(point.id), pointPresenter);
  }

  #renderFilterComponent() {
    render(this.#filerComponent, document.querySelector('.trip-main__trip-controls'), RenderPosition.BEFOREEND);
  }

  #renderBoard() {
    this.#renderPointsComponent();

    this.#renderFilterComponent();

    this.#renderPointSortComponent();

    this.#filterPresenter.init();

    this.#sorting(null, true);

    this.#setNewTripPointButton();
  }

  #resetAllPoints = () => {
    this.#pointsPresentors.forEach((pointPresentor) => {
      pointPresentor.resetView();
    });
  };
}
