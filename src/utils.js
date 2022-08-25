import dayjs from 'dayjs';

const getRandomNumber = (from = 0, to = 1) => {
  if(from < 0 || to < 0) {return null;}
  if(from === to) {return from;}
  if(from > to) {return null;}

  return Math.round(Math.random() * (to - from) + from);
};

const getRandomArrayElement = (array) => array[getRandomNumber(0, (array.length - 1))];

const getDeepObjectCopy = (object) => JSON.parse(JSON.stringify(object));

const getRandomDatePair = () => {
  const dates = {
    'data_from': '',
    'data_to': ''
  };

  // eslint-disable-next-line camelcase
  dates.data_from = dayjs().add(getRandomNumber(1, 7), 'day');
  // eslint-disable-next-line camelcase
  dates.data_to = dates.data_from.add(getRandomNumber(1, 7), 'day');

  return dates;
};

export{getRandomNumber, getRandomArrayElement, getDeepObjectCopy, getRandomDatePair};
