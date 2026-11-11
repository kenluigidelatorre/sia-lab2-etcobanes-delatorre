const test = require('node:test');
const assert = require('node:assert');
const app = require('../src/app');

let server;
let baseUrl;

test.before(() => {
  server = app.listen(0);
  baseUrl = 'http://localhost:' + server.address().port;
});

test.after(() => {
  server.close();
});

test('GET /health says the app is ok', async () => {
  const response = await fetch(baseUrl + '/health');
  const data = await response.json();
  assert.strictEqual(response.status, 200);
  assert.strictEqual(data.status, 'ok');
});

test('POST /api/calculate gives the correct answer', async () => {
  const response = await fetch(baseUrl + '/api/calculate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ distance: 100, efficiency: 40, price: 60, other: 50, riders: 2 })
  });
  const data = await response.json();
  assert.strictEqual(data.fuel, 150);
  assert.strictEqual(data.total, 200);
  assert.strictEqual(data.each, 100);
});