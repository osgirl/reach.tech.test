import { test as testPalindrome } from '../modules/palindrome';

const formatResponse = isPalindrome => ({ isPalindrome });

const check = cache => (req, res) => {
  const { value } = req.query;

  res.type('json');

  if (!value) {
    res.status(400);
    res.json(formatResponse(false));
  } else {
    const isPalindrome = testPalindrome(value);

    if (isPalindrome) {
      cache.push(value);
    }

    res.status(200);
    res.json(formatResponse(isPalindrome));
  }
};

export default check;
