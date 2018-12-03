import history from './history';

describe('history route', () => {
  const cacheValues = [
    'one',
    'two',
    'three',
    'four',
    'five',
  ];

  const maxValues = 5;

  const getSpy = jest.fn(() => cacheValues);
  const jsonSpy = jest.fn();
  const statusSpy = jest.fn();
  const typeSpy = jest.fn();

  const mockCache = {
    get: getSpy,
    push: () => {},
  };

  const mockRequest = {};
  const mockResponse = {
    json: jsonSpy,
    status: statusSpy,
    type: typeSpy,
  };

  history(mockCache, maxValues, false)(mockRequest, mockResponse);

  it('sets the response status', () => {
    expect(statusSpy).toHaveBeenCalledWith(expect.any(Number));
  });

  it('sets the response type to be JSON', () => {
    expect(typeSpy).toHaveBeenCalledWith(expect.stringMatching(/^(application\/)?json$/i));
  });

  it('gets the last X (`maxValues`) entries in the cache and returns them in the response body', () => {
    expect(getSpy).toHaveBeenCalledWith(maxValues);
    expect(jsonSpy).toHaveBeenCalledWith(cacheValues);
  });
});
