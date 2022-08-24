// import dayjs from 'dayjs';

const getRandomNumber = (from = 0, to = 1) => {
  if(from < 0 || to < 0) {return null;}
  if(from === to) {return from;}
  if(from > to) {return null;}

  return Math.round(Math.random() * (to - from) + from);
};

const getRandomArrayElement = (array) => array[getRandomNumber(0, (array.length - 1))];

const getDeepObjectCopy = (object) => JSON.parse(JSON.stringify(object));

// const generateRandomDate = () => {
//   const day = getRandomNumber(1, 28);
//   const month = getRandomNumber(1, 12);
//   return dayjs('22-12-2022', 'DD-MM-YYYY');
// };

export{getRandomNumber, getRandomArrayElement, getDeepObjectCopy};
