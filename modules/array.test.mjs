import { getLastValues } from './array';

describe('array utilities', () => {
  describe('getLastValues', () => {
    const array = ['first', 'second', 'third', 'fourth', 'fifth'];

    describe('when the array has less entries than the `numberOfValues` specified', () => {
      const numberOfValues = 10;

      it('returns all entries within the original array', () => {
        expect(getLastValues(array, numberOfValues)).toEqual(array);
      });
    });

    describe('when the array has the same number of entries as the `numberOfValues` specified', () => {
      const numberOfValues = 5;

      it('returns all entries within the original array', () => {
        expect(getLastValues(array, numberOfValues)).toEqual(array);
      });
    });

    describe('when the array has more entries than the `numberOfValues` specified', () => {
      const numberOfValues = 3;

      it('returns the requested number of values from the end of the array', () => {
        expect(getLastValues(array, numberOfValues)).toEqual(['third', 'fourth', 'fifth']);
      });
    });

    describe('when `numberOfValues` is a negative number', () => {
      const numberOfValues = -1;

      it('returns an empty array', () => {
        expect(getLastValues(array, numberOfValues)).toEqual([]);
      });
    });
  });
});
