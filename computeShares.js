// Import the splitSecret function from mpc.js
const { splitSecret } = require('./mpc');

// Function to compute shares for age and smoker status
function computeShares(ages, isSmoker) {
    // Split the secret for age and smoker status
    const ageShares = ages.map(age => splitSecret(age, 2, 2));
    const smokerShares = isSmoker.map(status => splitSecret(status ? 1 : 0, 2, 2)); // Convert smoker status to 1 or 0

    // Return shares for age and smoker status
    return { ageShares, smokerShares };
}

// Export the function
module.exports = {
    computeShares: computeShares
};