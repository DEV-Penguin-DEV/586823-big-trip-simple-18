import dayjs from 'dayjs';

const getRandomNumber = (from = 0, to = 1) => {
  if (from < 0 || to < 0) { return 0; }
  if (from === to) { return from; }
  if (from > to) { return 0; }

  return Math.round(Math.random() * (to - from) + from);
};

const getRandomArrayElement = (list) => list[getRandomNumber(0, (list.length - 1))];

const getRandomDatePair = () => {
  const dates = {
    dateFrom: '',
    dateTo: ''
  };

  dates.dateFrom = dayjs().add(getRandomNumber(1, 7), 'day').add(getRandomNumber(1, 23), 'hour');
  dates.dateTo = dates.dateFrom.add(getRandomNumber(1, 7), 'day').add(getRandomNumber(1, 23), 'hour');

  return dates;
};

export { getRandomNumber, getRandomArrayElement, getRandomDatePair };
