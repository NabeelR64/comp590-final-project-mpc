// Function to calculate the average age from an array of ages
function calculateAverageAge(ages) {
    if (ages.length === 0) return 0;
    const sum = ages.reduce((total, age) => total + age, 0);
    return sum / ages.length;
}


// Function to count the number of entries
function countEntries(data) {
    return data.length;
}

// Function to analyze the length of names
function analyzeNameLength(names) {
    const maxLength = Math.max(...names.map(name => name.length));
    const minLength = Math.min(...names.map(name => name.length));
    return { maxLength, minLength };
}

// Function to calculate the standard deviation of ages
function calculateStandardDeviation(ages) {
    if (ages.length === 0) return 0;

    // Step 1: Calculate the mean (average) of ages
    const mean = calculateAverageAge(ages);

    // Step 2: Calculate the squared differences from the mean
    const squaredDifferences = ages.map(age => Math.pow(age - mean, 2));

    // Step 3: Calculate the mean of squared differences
    const meanSquaredDifferences = calculateAverageAge(squaredDifferences);

    // Step 4: Calculate the square root of the mean of squared differences
    const standardDeviation = Math.sqrt(meanSquaredDifferences);

    return standardDeviation;
}


// Function to calculate the standard deviation of ages for smokers and non-smokers
 function calculateStandardDeviationForGroups(data) {
    const smokerAges = data.filter(entry => entry.isSmoker).map(entry => entry.age);
    const nonSmokerAges = data.filter(entry => !entry.isSmoker).map(entry => entry.age);

    const smokerStandardDeviation = calculateStandardDeviation(smokerAges);
    const nonSmokerStandardDeviation = calculateStandardDeviation(nonSmokerAges);

    return { smokerStandardDeviation, nonSmokerStandardDeviation };
}

// Function to process shares data
function processSharesData(ageShares, smokerShares) {
    // Example: Process shares data securely using MPC principles
    // For demonstration purposes, let's just return the sum of shares
    const ageSum = ageShares.reduce((total, share) => total + share, 0);
    const smokerSum = smokerShares.reduce((total, share) => total + share, 0);
    
    return { ageSum, smokerSum };
}


module.exports = {
    calculateAverageAge: calculateAverageAge,
    calculateStandardDeviation: calculateStandardDeviation,
    calculateStandardDeviationForGroups: calculateStandardDeviationForGroups,
    processSharesData: processSharesData
};
