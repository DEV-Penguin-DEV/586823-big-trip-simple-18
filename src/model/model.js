import Observable from '../framework/observable.js';
import dayjs from 'dayjs';
import { UpdateType } from '../constants.js';

export default class Model extends Observable {
  #pointsApi = null;
  #offersApi = null;
  #destinationsApi = null;

  constructor(pointsApi, offersApi, destinationsApi) {
    super();
    this.#pointsApi = pointsApi;
    this.#offersApi = offersApi;
    this.#destinationsApi = destinationsApi;
  }

  #destinations = [];
  #offersByTypes = [];
  #tripPoints = [];

  init = async () => {
    try {
      const tripPoints = await this.#pointsApi.points;
      this.#tripPoints = tripPoints.map(this.#adaptToClient);

      this.#offersByTypes = await this.#offersApi.offers;

      this.#destinations = await this.#destinationsApi.destinations;
    } catch (error) {
      this.#tripPoints = [];

      this.#offersByTypes = [];

      this.#destinations = [];
    }

    this._notify(UpdateType.INIT);
  };

  #adaptToClient(point) {
    const adaptedPoint = {
      ...point,
      basePrice: point['base_price'],
      dateFrom: dayjs(point['date_from']),
      dateTo: dayjs(point['date_to']),
    };

    delete adaptedPoint['base_price'];
    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];
    return adaptedPoint;
  }

  get tripPoints() {
    return this.#tripPoints;
  }

  get offersByTypes() {
    return this.#offersByTypes;
  }

  get destinations() {
    return this.#destinations;
  }

  updatePoint = async (updateType, update) => {
    const index = this.#tripPoints.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    try {
      const response = await this.#pointsApi.updatePoint(update);
      const updatedPoint = this.#adaptToClient(response);

      this.#tripPoints = [
        ...this.#tripPoints.slice(0, index),
        update,
        ...this.#tripPoints.slice(index + 1),
      ];
      this._notify(updateType, updatedPoint);
    } catch (err) {
      throw new Error('Can\'t update task');
    }
  };

  addPoint = (updateType, update) => {
    this.#tripPoints = [
      update,
      ...this.#tripPoints,
    ];

    this._notify(updateType, update);
  };

  deletePoint = (updateType, update) => {
    const index = this.#tripPoints.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    this.#tripPoints = [
      ...this.#tripPoints.slice(0, index),
      ...this.#tripPoints.slice(index + 1),
    ];

    this._notify(updateType);
  };
}
