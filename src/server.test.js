const server = require('./server');
const calc = new server();


test('adds 1 + 2 to equal 3', () => {
  expect(calc.sum(1, 2)).toBe(3);
});

test('adds 1 + 2 to equal 4', () => {
  expect(calc.sum2(1, 2)).toBe(4);
});

