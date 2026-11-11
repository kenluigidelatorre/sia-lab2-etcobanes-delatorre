const test = require('node:test');
const assert = require('node:assert');
const { computeFuelCost, computeTotalCost, splitCost } = require('../src/logic');

test('100 km at 40 km/L and P60 per liter costs 150 pesos in fuel', () => {
  assert.strictEqual(computeFuelCost(100, 40, 60), 150);
});

test('fuel 150 plus other expenses 50 is a total of 200 pesos', () => {
  assert.strictEqual(computeTotalCost(150, 50), 200);
});

test('200 pesos split by 2 riders is 100 pesos each', () => {
  assert.strictEqual(splitCost(200, 2), 100);
});

test('a distance of 0 is not allowed', () => {
  assert.throws(() => computeFuelCost(0, 40, 60));
});

test('0 riders is not allowed', () => {
  assert.throws(() => splitCost(200, 0));
});