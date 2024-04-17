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