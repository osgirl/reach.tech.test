import {
  removeNonWordCharacters,
  reverse,
} from './string';

describe('string utilities', () => {
  describe('removeNonWordCharacters', () => {
    it('returns the input string with any whitespace characters having been removed', () => {
      expect(removeNonWordCharacters('text with some spaces')).toBe('textwithsomespaces');
    });

    it('returns the input string with any punctuation having been removed', () => {
      expect(removeNonWordCharacters('text!With-punctuation?')).toBe('textWithpunctuation');
    });

    it('treats underscores as spacing and removes any encountered', () => {
      expect(removeNonWordCharacters('text_with_underscores')).toBe('textwithunderscores');
    });
  });

  describe('reverse', () => {
    it('returns the input value with the characters in the reverse order', () => {
      expect(reverse('Test Case')).toBe('esaC tseT');
    });
  });
});
