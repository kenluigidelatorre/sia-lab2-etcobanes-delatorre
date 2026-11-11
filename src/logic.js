// The "brain" of the app. The automated tests check these functions.

// Returns the fuel cost in pesos. Example: 100 km, 40 km/L, P60 per liter -> 150
function computeFuelCost(distanceKm, kmPerLiter, fuelPrice) {
  if (!Number.isFinite(distanceKm) || distanceKm <= 0) {
    throw new Error('Distance must be more than 0');
  }
  if (!Number.isFinite(kmPerLiter) || kmPerLiter <= 0) {
    throw new Error('Fuel efficiency must be more than 0');
  }
  if (!Number.isFinite(fuelPrice) || fuelPrice <= 0) {
    throw new Error('Fuel price must be more than 0');
  }
  return Math.round((distanceKm / kmPerLiter) * fuelPrice * 100) / 100;
}

// Returns the total trip cost. Example: fuel 150 + other expenses 50 -> 200
function computeTotalCost(fuelCost, otherExpenses) {
  if (!Number.isFinite(otherExpenses) || otherExpenses < 0) {
    throw new Error('Other expenses cannot be negative');
  }
  return Math.round((fuelCost + otherExpenses) * 10) / 100;
}

// Returns the cost per rider. Example: 200 split by 2 riders -> 100
function splitCost(total, riders) {
  if (!Number.isInteger(riders) || riders < 1) {
    throw new Error('Riders must be 1 or more');
  }
  return Math.round((total / riders) * 100) / 100;
}

module.exports = { computeFuelCost, computeTotalCost, splitCost };