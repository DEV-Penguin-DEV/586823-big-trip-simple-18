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

const generateTripPointOffer = () => {
  const pointOffer = {
    title: getRandomArrayElement(constants.OFFER_DESCRIPTIONS),
    price: getRandomNumber(constants.OfferPriceRange.MIN, constants.OfferPriceRange.MAX)
  };

  return pointOffer;
};

const generateTripPointOffers = () => {
  const offersByTypes = {};

  constants.TRIP_POINT_TYPES.forEach((type) => {
    const offers = [];
    const usedDescriptions = [];
    const countOffers = getRandomNumber(1, constants.OFFER_DESCRIPTIONS.length);

    for (let i = 0; i < countOffers; i++) {
      let offer;
      do {
        offer = generateTripPointOffer();
      } while (usedDescriptions.indexOf(offer) !== -1);

      offers[i] = offer;
      usedDescriptions[i] = offer.description;
    }

    offersByTypes[type] = offers;
  });

  return offersByTypes;
};

const generateTripPointDestination = (i) => {
  const pointDestination = {
    id: i,
    description: getRandomArrayElement(constants.TRIP_POINTS_DESCRIPTIONS),
    name: constants.CITYS[i],
    pictures: generatePictures()
  };

  return pointDestination;
};

const generateTripPointDestinations = () => {
  const destinations = [];

  constants.CITYS.forEach((name, i) => {
    const usedNames = [];

    let destination;
    do {
      destination = generateTripPointDestination(i);
    } while (usedNames.indexOf(destination.name) !== -1);

    usedNames[i] = destination.name;

    destinations[i] = destination;
  });

  return destinations;
};

const generateTripPoint = (id) => {
  const dates = getRandomDatePair();
  const point = {
    basePrice: getRandomNumber(constants.BasePriceRange.MIN, constants.BasePriceRange.MAX),
    dateFrom: dates.dateFrom,
    dateTo: dates.dateTo,
    destination: {},
    id: `${id}`,
    offers: [],
    type: getRandomArrayElement(constants.TRIP_POINT_TYPES)
  };

  return point;
};

const generateTripPoints = (tripsCount, offersByTypes, destinations) => {
  const TripPoints = [];
  for (let i = 0; i < tripsCount; i++) {
    const point = generateTripPoint(i);
    point.destination = destinations[i];
    point.offers = offersByTypes[point.type];
    TripPoints.push(point);
  }

  return TripPoints;
};

export { generateTripPoints, generateTripPointOffers, generateTripPointDestinations };
