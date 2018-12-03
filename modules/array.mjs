// eslint-disable-next-line import/prefer-default-export
export const getLastValues = (array, numberOfValues) => array
  .slice(Math.max(array.length - numberOfValues, 0));
