


// Function to generate a random prime number
function generatePrime(min, max) {
    // Generate a random number between min and max
    const num = Math.floor(Math.random() * (max - min + 1)) + min;

    // Check if the number is prime
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
            return generatePrime(min, max); // Not prime, generate another number
        }
    }
    return num; // Prime number found
}

// Function to perform Beaver's multiplication protocol for two secret-shared values
function beaversMultiplication(shareA, shareB, prime) {
    // Generate random shares for masking values
    const maskA = Math.floor(Math.random() * prime); // Random value for masking shareA
    const maskB = Math.floor(Math.random() * prime); // Random value for masking shareB

    // Compute the masked shares
    const maskedShareA = (shareA.value - maskA + prime) % prime; // (shareA - maskA) mod prime
    const maskedShareB = (shareB.value - maskB + prime) % prime; // (shareB - maskB) mod prime

    // Compute the product of the masked shares
    const maskedProduct = (maskedShareA * maskedShareB) % prime; // (maskedShareA * maskedShareB) mod prime

    // Compute the masked product
    const maskedShareProduct = (maskedProduct + maskA * shareB.value + maskB * shareA.value) % prime; // (maskedProduct + maskA * shareB + maskB * shareA) mod prime

    // Return the masked product as a new share
    return { index: shareA.index, value: maskedShareProduct };
}

// Function to generate random coefficients for polynomial
function generateCoefficients(secret, threshold, prime) {
    const coefficients = [secret]; // First coefficient is the secret
    for (let i = 1; i < threshold; i++) {
        coefficients.push(Math.floor(Math.random() * (prime - 1)) + 1); // Random coefficient between 1 and prime-1
    }
    return coefficients;
}

// Function to evaluate polynomial at x
function evaluatePolynomial(coefficients, x, prime) {
    let result = 0;
    for (let i = 0; i < coefficients.length; i++) {
        result += (coefficients[i] * Math.pow(x, i)) % prime;
    }
    return result % prime;
}

// Function to split secret into shares using Shamir's Secret Sharing Scheme
function splitSecret(secret, numShares, threshold) {
    const prime = generatePrime(1000, 10000); // Generate a prime number
    const coefficients = generateCoefficients(secret, threshold - 1, prime); // Generate random coefficients

    const shares = [];
    for (let i = 1; i <= numShares; i++) {
        const share = evaluatePolynomial(coefficients, i, prime); // Evaluate polynomial at x=i
        shares.push({ index: i, value: share });
    }
    return { prime, shares };
}

function computeShares(ages, isSmoker) {
    // Split the secret for age and smoker status
    const ageShares = ages.map(age => splitSecret(age, 2, 2)); // Split age into shares
    const smokerShares = isSmoker.map(status => splitSecret(status ? 1 : 0, 2, 2)); // Convert smoker status to 1 or 0 and split into shares

    // Return shares for age and smoker status
    return { ageShares, smokerShares };
}

// Simulate distributing shares to two servers
function distributeShares(shares) {
    const server1Shares = [];
    const server2Shares = [];
    shares.forEach((share) => {
        const rand = Math.random();
        if (rand < 0.5) {
            server1Shares.push(share);
        } else {
            server2Shares.push(share);
        }
    });
    return { server1Shares, server2Shares };
}

// Simulate computation using MPC (Addition in this case)
function mpcAddition(share1, share2, prime) {
    const sum = (share1.value + share2.value) % prime;
    return sum;
}

module.exports = {
    splitSecret: splitSecret,
    beaversMultiplication: beaversMultiplication,
    computeShares: computeShares
};

// Example usage
const secret = 42;
const numShares = 5;
const threshold = 3;

const { prime, shares } = splitSecret(secret, numShares, threshold);
const { server1Shares, server2Shares } = distributeShares(shares);

// Assume server1 and server2 have their shares and perform computation
const result = mpcAddition(server1Shares[0], server2Shares[0], prime);
console.log("Result of addition:", result);
