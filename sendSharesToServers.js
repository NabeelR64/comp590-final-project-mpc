// Function to send shares to servers (simulated)
function sendSharesToServers(ageShares, smokerShares) {
    console.log("Sending age shares to Server 1:", ageShares[0]);
    console.log("Sending age shares to Server 2:", ageShares[1]);
    console.log("Sending smoker shares to Server 3:", smokerShares[0]);
    console.log("Sending smoker shares to Server 4:", smokerShares[1]);
}

// Export the function
module.exports = {
    sendSharesToServers: sendSharesToServers
};