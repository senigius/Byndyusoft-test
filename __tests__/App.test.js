import { getSumOfTwoMinNumbers } from '../src/App.jsx';

const arrays = [
  { expected: -11, data: [1, 3, 5, -12, 5, 7, 2, 3] },
  { expected: -234.4, data: [0, 0, -234.4, 1, 2, 68] },
  { expected: 4, data: [2, 2, 2, 2, 2, 2, 2, 2] },
];

test.each(arrays)('test %#', ({ expected, data }) => {
  expect(getSumOfTwoMinNumbers(data)).toEqual(expected);
});

test('func has no args', () => {
  expect(getSumOfTwoMinNumbers()).toBe(null);
});
