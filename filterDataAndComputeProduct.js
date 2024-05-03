// Function to filter data and compute product of smoker status and age
function filterDataAndComputeProduct(ageShares, smokerShares) {
    // Multiply shares of smoker status by shares of age
    const productShares = [];
    for (let i = 0; i < 2; i++) {
        productShares.push(ageShares[i] * smokerShares[i]);
    }

    // Return the product shares
    return productShares;
}

// Export the function
module.exports = {
    filterDataAndComputeProduct: filterDataAndComputeProduct
};