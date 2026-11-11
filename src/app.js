const express = require('express');
const path = require('path');
const { computeFuelCost, computeTotalCost, splitCost } = require('./logic');
const { version } = require('../package.json');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

// Health check: the pipeline calls this to see if the app is alive
app.get('/health', (req, res) => {
  res.json({ status: 'ok', version: version });
});

// The main feature of the app
app.post('/api/calculate', (req, res) => {
  try {
    const distance = Number(req.body.distance);
    const efficiency = Number(req.body.efficiency);
    const price = Number(req.body.price);
    const other = Number(req.body.other);
    const riders = Number(req.body.riders);
    const fuel = computeFuelCost(distance, efficiency, price);
    const total = computeTotalCost(fuel, other);
    const each = splitCost(total, riders);
    res.json({ fuel: fuel, total: total, each: each });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = app;