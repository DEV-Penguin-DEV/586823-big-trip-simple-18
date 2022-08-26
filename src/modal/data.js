import { getRandomNumber, getRandomArrayElement, getDeepObjectCopy, getRandomDatePair} from '../utils.js';
import * as constants from '../constants.js';

/*----------------TEMPLATES----------------*/
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

const pointOfferTemplate = {
  'id': 0,
  'title': '',
  'price': 0
};

const pointObjectTemplate = {
  'basePrice': 0,
  'dateFrom': '',
  'dateTo': '',
  'destination': {},
  'id': '',
  'offers': [],
  'type': ''
};


/*----------------FUNCTIONS----------------*/
const generateTestTripPointOffer = (id) => {
  const newTripPointOffer = getDeepObjectCopy(pointOfferTemplate);

  newTripPointOffer.id = id;
  newTripPointOffer.title = getRandomArrayElement(constants.OFFER_DESCRIPTIONS);
  newTripPointOffer.price = getRandomNumber(constants.OFFER_PRICE_RANGE.min, constants.OFFER_PRICE_RANGE.max) * 10;

  return newTripPointOffer;
};

const generateAllTestTripPointOffers = (id) => {
  const offers = [];
  const usedDescriptions = [];
  const countOffers = getRandomNumber(0, constants.OFFER_DESCRIPTIONS.length);

  for(let i = 0; i < countOffers; i++) {
    let offer;
    do {
      offer = generateTestTripPointOffer(id);
    } while(usedDescriptions.indexOf(offer) !== -1);

    offers[i] = offer;
    usedDescriptions[i] = offer.description;
  }

  return offers;
};

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

const generateTestTripPointData = (id) => {
  const newTestTripPointData = getDeepObjectCopy(pointObjectTemplate);
  const dates = getRandomDatePair();

  // Trip point base object

  newTestTripPointData.basePrice = getRandomNumber(constants.BASE_PRICE_RANGE.min, constants.BASE_PRICE_RANGE.max) * 10;
  newTestTripPointData.id = `${id}`;
  newTestTripPointData.type = getRandomArrayElement(constants.TRIP_POINT_TYPES);
  newTestTripPointData.dateFrom = dates.dateFrom;
  newTestTripPointData.dateTo = dates.dateTo;

  return newTestTripPointData;
};


const generateAllTestTripPointsData = (countTrips) => {
  const allTestTripPointsData = [];
  for(let i = 0; i < countTrips; i++) {
    allTestTripPointsData[i] = generateTestTripPointData(i);
    allTestTripPointsData[i].destination = generateTestTripPointDestination(i);
    allTestTripPointsData[i].offers = generateAllTestTripPointOffers(i);
  }

  return allTestTripPointsData;
};

export {generateAllTestTripPointsData};