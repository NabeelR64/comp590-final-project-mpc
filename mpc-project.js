// Create a constructor function for the MPC Project
class MPCProject {
    constructor() {
        // Set the properties of the MPCProject object
        this.name = '';
        this.age = '';
        this.isSmoker = false;

    }
    // Define the submitInfo function for the MPCProject object
    submitInfo() {
        // Get the values of the name and age inputs
        this.name = document.getElementById('name').value;
        this.age = document.getElementById('age').value;
        // Get the value of the smoker checkbox
        const isSmoker = document.getElementById('smoker').checked;

        // Log the name, age, and smoking status to the console
        console.log(`Name: ${this.name}, Age: ${this.age}, Smoker: ${isSmoker ? 'Yes' : 'No'}`);

        
    }
}
  
  
  // Create an instance of the MPCProject object
  const mpcProject = new MPCProject();
  
  // Attach the submitInfo function to the button's onclick event
  document.querySelector('button').addEventListener('click', function() {
    mpcProject.submitInfo();
  });