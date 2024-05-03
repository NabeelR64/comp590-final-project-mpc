
const { computeShares } = require('./mpc');
const {
    calculateAverageAge,
    calculateStandardDeviation,
    calculateStandardDeviationForGroups,
    processSharesData
} = require('./data-processing');


// Example usage
const ages = [25, 30, 35, 40, 45];
const isSmoker = [true, false, true, false, true];

// Test calculateAverageAge
const averageAge = calculateAverageAge(ages);

// Test calculateStandardDeviation
const standardDeviation = calculateStandardDeviation(ages);

// Test calculateStandardDeviationForGroups
const standardDeviationGroups = calculateStandardDeviationForGroups([{ age: 25, isSmoker: true }, { age: 30, isSmoker: false }, { age: 35, isSmoker: true }, { age: 40, isSmoker: false }, { age: 45, isSmoker: true }]);

const { ageShares, smokerShares } = computeShares(ages, isSmoker);

console.log('Average Age:', averageAge);
console.log('Standard Deviation:', standardDeviation);
console.log('Standard Deviation for Groups:', standardDeviationGroups);
console.log("Age Shares:", ageShares);
console.log("Smoker Shares:", smokerShares);

