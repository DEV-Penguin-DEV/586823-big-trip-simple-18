const CITYS = ['Kiev', 'Zurich', 'Basel', 'Milan', 'Nica', 'Barselona'];
const TRIP_POINTS_DESCRIPTIONS = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit', 'Cras aliquet varius magna, non porta ligula feugiat eget', 'Fusce tristique felis at fermentum pharetra', 'Aliquam id orci ut lectus varius viverra', 'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante', 'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum', 'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui', 'Sed sed nisi sed augue convallis suscipit in sed felis', 'Aliquam erat volutpat', 'Nunc fermentum tortor ac porta dapibus', 'In rutrum ac purus sit amet tempus.'];
const TRIP_POINT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const OFFER_DESCRIPTIONS = ['Add bagage', 'Upgrade to a business class', 'Add the Red carpet', 'Add champagnie', 'Buy insurance'];

const OfferPriceRange = {
  MIN: 1,
  MAX: 50
};

const BasePriceRange = {
  MIN: 10,
  MAX: 100
};

const COUNT_OF_TRIP_POINTS = 3;
const COUNT_OF_TRIP_POINTS_PICTURES = 3;

const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers'
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future'
};

const DEFAULT_SORT_TYPE = SortType.DAY;
const DEFAULT_FILTER_TYPE = FilterType.EVERYTHING;

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

export { FilterType, DEFAULT_FILTER_TYPE, DEFAULT_SORT_TYPE, UserAction, UpdateType, CITYS, TRIP_POINTS_DESCRIPTIONS, TRIP_POINT_TYPES, OFFER_DESCRIPTIONS, OfferPriceRange, BasePriceRange, COUNT_OF_TRIP_POINTS, COUNT_OF_TRIP_POINTS_PICTURES, SortType };
