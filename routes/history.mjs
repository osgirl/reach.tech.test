const history = (
  cache,
  maxValues,
) => (req, res) => {
  res.status(200);
  res.type('json');
  res.json(cache.get(maxValues));
};

export default history;
