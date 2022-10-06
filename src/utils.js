const getRandomNumber = (from = 0, to = 1) => {
  if (from < 0 || to < 0) { return 0; }
  if (from === to) { return from; }
  if (from > to) { return 0; }

  return Math.round(Math.random() * (to - from) + from);
};

const isEscape = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

export { getRandomNumber, isEscape };
