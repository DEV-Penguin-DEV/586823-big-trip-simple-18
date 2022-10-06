/* eslint-disable camelcase */
import ApiService from './framework/api-service.js';
import { Method } from './constants.js';

export default class PointsApiService extends ApiService {
  get points() {
    return this._load({ url: 'points' })
      .then(ApiService.parseResponse);
  }

  updatePoint = async (point) => {
    const response = await this._load({
      url: `points/${point.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(point)),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  };

  addPoint = async (point) => {
    const response = await this._load({
      url: 'points',
      method: Method.POST,
      body: JSON.stringify(this.#adaptToServer(point)),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  };

  deletePoint = async (point) => {
    await this._load({
      url: `points/${point.id}`,
      method: Method.DELETE,
    });
  };

  #adaptToServer(point) {
    const adaptedPoint = {
      ...point,
      'base_price': Number(point['basePrice']),
      'date_from': new Date(point['dateFrom']).toISOString(),
      'date_to': new Date(point['dateTo']).toISOString(),
    };

    delete adaptedPoint['basePrice'];
    delete adaptedPoint['dateFrom'];
    delete adaptedPoint['dateTo'];

    return adaptedPoint;
  }
}
