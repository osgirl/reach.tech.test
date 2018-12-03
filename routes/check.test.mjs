import check from './check';

describe('check route', () => {
  const jsonSpy = jest.fn();
  const pushSpy = jest.fn();
  const setSpy = jest.fn();
  const statusSpy = jest.fn();
  const typeSpy = jest.fn();

  const mockCache = {
    get: () => ([]),
    push: pushSpy,
    set: setSpy,
  };

  const mockResponse = {
    json: jsonSpy,
    status: statusSpy,
    type: typeSpy,
  };

  describe('when no value is provided in the request', () => {
    beforeEach(() => {
      jest.resetAllMocks();

      const mockRequest = {
        query: {
          value: undefined,
        },
      };
      check(mockCache, () => true)(mockRequest, mockResponse);
    });

    it('sets the response type to be JSON', () => {
      expect(typeSpy).toHaveBeenCalledWith(expect.stringMatching(/^(application\/)?json$/i));
    });

    it('sets the response status to be HTTP 400', () => {
      expect(statusSpy).toHaveBeenCalledWith(400);
    });
  });

  describe('when a value is provided in the request', () => {
    beforeEach(() => {
      jest.resetAllMocks();

      const mockRequest = {
        query: {
          value: 'a',
        },
      };
      check(mockCache, () => true)(mockRequest, mockResponse);
    });

    it('sets the response type to be JSON', () => {
      expect(typeSpy).toHaveBeenCalledWith(expect.stringMatching(/^(application\/)?json$/i));
    });

    it('sets the response status to be HTTP 200', () => {
      expect(statusSpy).toHaveBeenCalledWith(200);
    });

    describe('when the value is a palindrome', () => {
      const palindrome = 'Dammit I\'m Mad';

      beforeEach(() => {
        jest.resetAllMocks();

        const mockRequest = {
          query: {
            value: palindrome,
          },
        };
        check(mockCache, () => true)(mockRequest, mockResponse);
      });

      it('returns a response body that states the value provided is a Palindrome', () => {
        expect(jsonSpy).toHaveBeenCalledWith(expect.objectContaining({
          isPalindrome: true,
        }));
      });

      it('adds the value to the cache of palindromes', () => {
        expect(pushSpy).toHaveBeenCalledTimes(1);
        expect(pushSpy).toHaveBeenCalledWith(palindrome);
      });
    });

    describe('when the value is not a palindrome', () => {
      beforeEach(() => {
        jest.resetAllMocks();

        const mockRequest = {
          query: {
            value: 'This is not a palindrome!',
          },
        };
        check(mockCache, () => true)(mockRequest, mockResponse);
      });

      it('returns a response body that states the value provided is not a Palindrome', () => {
        expect(jsonSpy).toHaveBeenCalledWith(expect.objectContaining({
          isPalindrome: false,
        }));
      });

      it('does not add the value to the cache of palindromes', () => {
        expect(pushSpy).not.toHaveBeenCalled();
        expect(setSpy).not.toHaveBeenCalled();
      });
    });
  });
});
