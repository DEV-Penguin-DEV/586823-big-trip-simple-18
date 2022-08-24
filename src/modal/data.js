import { getRandomNumber, getRandomArrayElement, getDeepObjectCopy} from '../utils.js';
import * as constants from '../constants.js';

const pointDestinationTemplate = {
  'id': 0,
  'description': '',
  'name': '',
  'pictures': [
    {
      'src': 'http://picsum.photos/300/200?r=',
      'description': ''
    }
  ]
};

// const pointOfferTemplate = {
//   'id': 0,
//   'title': '',
//   'price': 0
// };

const pointObjectTemplate = {
  'base_price': 0,
  'date_from': '',
  'date_to': '',
  'destination': {},
  'id': '',
  'offers': [],
  'type': ''
};

const generateTestTripPointData = (id) => {
  const newTestTripPointData = getDeepObjectCopy(pointObjectTemplate);

  // Trip point base object
  // eslint-disable-next-line camelcase
  newTestTripPointData.base_price = getRandomNumber(100, 5000);
  newTestTripPointData.id = `${id}`;
  newTestTripPointData.type = getRandomArrayElement(constants.TRIP_POINT_TYPES);
  // eslint-disable-next-line camelcase

  return newTestTripPointData;
};

// const generateTestTripPointOffer = (id) => {
//   const newTripPointOffer = getDeepObjectCopy(pointOfferTemplate);
//   // Trip point offer
//   newTripPointOffer.id = id;
//   newTripPointOffer.title = 'Upgrade to a business class';
//   newTripPointOffer.price = getRandomNumber(50, 5000);

//   return newTripPointOffer;
// };

const generateTestTripPointDestination = (id) => {
  const newTripPointDestination = getDeepObjectCopy(pointDestinationTemplate);

  // Trip point destination
  newTripPointDestination.id = id;
  newTripPointDestination.description = getRandomArrayElement(constants.TRIP_POINTS_DESCRIPTIONS);
  newTripPointDestination.name = getRandomArrayElement(constants.CITYS);
  newTripPointDestination.pictures.forEach((picture) => {
    picture.src += Math.random();
    picture.description = getRandomArrayElement(constants.TRIP_POINTS_DESCRIPTIONS);
  });

  return newTripPointDestination;
};

// const generateAllTestTripPointOffers = (countTrips) => {
//   const offers = [];
//   for(let i = 0; i < countTrips; i++) {
//     for(let j = 0; j < getRandomNumber(1, 5); j++) {
//       offers[j] = generateTestTripPointOffer(i);
//     }
//   }

//   return offers;
// };

const generateAllTestTripPointsData = (countTrips) => {
  const AllTestTripPointsData = [];
  for(let i = 0; i < countTrips; i++) {
    AllTestTripPointsData[i] = generateTestTripPointData(i);
  }

  return AllTestTripPointsData;
};

const generateAllTestTripPointsDestination = (countTrips) => {
  const AllTestTripPointsDestination = [];
  for(let i = 0; i < countTrips; i++) {
    AllTestTripPointsDestination[i] = generateTestTripPointDestination(i);
  }

  return AllTestTripPointsDestination;
};

export {generateAllTestTripPointsData, generateAllTestTripPointsDestination};
