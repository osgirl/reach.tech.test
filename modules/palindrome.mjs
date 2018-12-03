import {
  removeNonWordCharacters,
  reverse as reverseString,
} from './string';

// eslint-disable-next-line import/prefer-default-export
export const test = (value) => {
  const sanitised = removeNonWordCharacters(value.toLowerCase());
  const reversed = reverseString(sanitised);
  return sanitised === reversed;
};
