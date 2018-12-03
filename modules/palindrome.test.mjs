import { test as testPalindrome } from './palindrome';

const mirroredStrings = [
  '',
  'A',
  'BB',
  'LOL',
  'noon',
  'radar',
  'racecar',
];

const mixedCases = [
  'Bb',
  'NoOn',
  'Radar',
  'RaceCar',
];

const includesPunctuation = [
  'a!a',
  'cat|tac',
  '|aba|aba|',
];

const includesWhitespace = [
  'taco cat',
  'race car',
  'race fast safe car',
];

const includesWhitespaceWithMixedCases = [
  'Taco Cat',
  'Race Car',
  'Race Fast Safe Car',
];

const includesWhitespaceAndPunctuation = [
  'taco cat!',
  'race, car!!',
  'race fast, safe car.',
];

const includesWhitespaceWithPunctuationAndMixedCases = [
  'Race fast, safe car.',
  'Was it a car or a cat I saw?',
  "Go hang a salami, I'm a lasagna hog.",
  'A man, a plan, a canal - Panama!',
];

describe('palindrome utilities', () => {
  describe('test', () => {
    describe('when the value supplied is a palindrome', () => {
      const positiveCases = [
        ...mirroredStrings,
        ...mixedCases,
        ...includesPunctuation,
        ...includesWhitespace,
        ...includesWhitespaceWithMixedCases,
        ...includesWhitespaceAndPunctuation,
        ...includesWhitespaceWithPunctuationAndMixedCases,
      ];

      it('should return `true`', () => {
        positiveCases.forEach(
          value => expect(testPalindrome(value)).toBe(true),
        );
      });
    });

    describe('when the value supplied is not a palindrome', () => {
      const negativeCases = [
        'AB',
        'ABC',
        'dog',
        'racingcar',
      ];

      it('should return `false`', () => {
        negativeCases.forEach(
          value => expect(testPalindrome(value)).toBe(false),
        );
      });
    });
  });
});
