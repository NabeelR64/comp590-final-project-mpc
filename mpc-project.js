// Create a constructor function for the MPC Project
class MPCProject {
    constructor() {
        // Set the properties of the MPCProject object
        this.name = '';
        this.age = '';
    }
    // Define the submitInfo function for the MPCProject object
    submitInfo() {
        // Get the values of the name and age inputs
        this.name = document.getElementById('name').value;
        this.age = document.getElementById('age').value;

        // Log the name and age to the console
        console.log(`Name: ${this.name}, Age: ${this.age}`);
    }
}
  
  
  // Create an instance of the MPCProject object
  const mpcProject = new MPCProject();
  
  // Attach the submitInfo function to the button's onclick event
  document.querySelector('button').addEventListener('click', function() {
    mpcProject.submitInfo();
  });