import { getRandomNumber, getRandomArrayElement, getRandomDatePair } from '../utils.js';
import * as constants from '../constants.js';


const generatePictures = () => {
  const result = [];
  for (let i = 0; i < constants.COUNT_OF_TRIP_POINTS_PICTURES; i++) {
    result.push(
      {
        src: `http://picsum.photos/300/200?r=${Math.random()}`,
        description: getRandomArrayElement(constants.TRIP_POINTS_DESCRIPTIONS)
      }
    );
  }
  return result;
};

const generateTripPointOffer = (id) => {
  const pointOffer = {
    id: id,
    title: getRandomArrayElement(constants.OFFER_DESCRIPTIONS),
    price: getRandomNumber(constants.OfferPriceRange.MIN, constants.OfferPriceRange.MAX)
  };

  return pointOffer;
};

const generateTripPointOffers = (id) => {
  const offers = [];
  const usedDescriptions = [];
  const countOffers = getRandomNumber(1, constants.OFFER_DESCRIPTIONS.length);

  for (let i = 0; i < countOffers; i++) {
    let offer;
    do {
      offer = generateTripPointOffer(id);
    } while (usedDescriptions.indexOf(offer) !== -1);

    offers[i] = offer;
    usedDescriptions[i] = offer.description;
  }

  return offers;
};

const generateTripPointDestination = (id) => {
  const pointDestination = {
    id: id,
    description: getRandomArrayElement(constants.TRIP_POINTS_DESCRIPTIONS),
    name: getRandomArrayElement(constants.CITYS),
    pictures: generatePictures()
  };

  return pointDestination;
};

const generateTripPoint = (id) => {
  const dates = getRandomDatePair();
  const point = {
    basePrice: getRandomNumber(constants.BasePriceRange.MIN, constants.BasePriceRange.MAX),
    dateFrom: dates.dateFrom,
    dateTo: dates.dateTo,
    destination: generateTripPointDestination(id),
    id: `${id}`,
    offers: generateTripPointOffers(id),
    type: getRandomArrayElement(constants.TRIP_POINT_TYPES)
  };

  return point;
};

const generateTripPoints = (tripsCount) => {
  const TripPoints = [];
  for (let i = 0; i < tripsCount; i++) {
    const point = generateTripPoint(i);
    TripPoints.push(point);
  }

  return TripPoints;
};

export { generateTripPoints };
