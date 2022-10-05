import dayjs from 'dayjs';
import { DEFAULT_FILTER_TYPE, FilterType } from '../constants.js';

export default class FilterPresenter {
  #checkedFilterType = DEFAULT_FILTER_TYPE;
  #model = null;
  #renderSort = null;
  #filerComponent = null;

  constructor(model, renderSort, filerComponent) {
    this.#model = model;
    this.#renderSort = renderSort;
    this.#filerComponent = filerComponent;
  }

  init() {
    this.#filerComponent.setClickHandler(this.#filtringClick);
    this.#filtringClick(null, true);
  }

  #filtringClick = (evt, isDefaultFiltring = false) => {
    let filterType = null;
    if (isDefaultFiltring) {
      filterType = DEFAULT_FILTER_TYPE;
      document.querySelector('#filter-everything').checked = true;
    } else {
      const typeInput = evt.target;
      filterType = typeInput.dataset.filterType;
      if (filterType === this.#checkedFilterType) {
        return;
      }
    }

    this.#checkedFilterType = filterType;
    this.filtring();
  };

  filtring = (isGetting = false) => {
    let filtredPoints = this.#model.tripPoints;
    switch (this.#checkedFilterType) {
      case FilterType.EVERYTHING:
        filtredPoints = this.#filtringEverything();
        break;

      case FilterType.FUTURE:
        filtredPoints = this.#filtringFuture();
        break;
    }

    if (isGetting) {
      return filtredPoints;
    }

    this.#renderSort(filtredPoints);
  };

  #filtringEverything() {
    return this.#model.tripPoints;
  }

  #filtringFuture() {
    const result = [];
    this.#model.tripPoints.forEach((point) => {
      if (point.dateFrom >= dayjs() || point.dateTo > dayjs()) {
        result.push(point);
      }
    });
    return result;
  }
}
