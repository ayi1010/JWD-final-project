// Initialize a new TaskManager with currentId set to 0
const taskManager = new TaskManager(0);
// Here is where you can test your code after completing all the steps
 // Finding and Display the Date Object
const dateElement = document.querySelector("#date-element");
let today = new Date();
const [month, day, year] = [today.getMonth()+1, today.getDate(), today.getFullYear()];
let dateString = `Current Date: ${day} / ${month} / ${year}`;
dateElement.innerHTML = dateString;

const form = document.querySelector("#new-task-form");

form.addEventListener("submit", (event) => {
  const validateName = document.querySelector("#newTaskName");
  const validateDescription = document.querySelector("#newTaskDescription");
  const validateAssignedTo = document.querySelector("#newTaskAssignedTo");
  const validateDueDate = document.querySelector("#newTaskDueDate");
  const validateStatus = document.querySelector("#newTaskStatus");
  let validationFail = 0;

  event.preventDefault();
  //event.stopPropagation();
  const clearFormFields = () => {
    validateName.value = "";
    validateDescription.value = "";
    validateAssignedTo.value = "";
    validateStatus.value = "In Progress";
    validateDueDate.value = "";
    validateName.classList.remove("is-valid");
    validateDescription.classList.remove("is-valid");
    validateAssignedTo.classList.remove("is-valid");
    validateStatus.classList.remove("is-valid");
    validateDueDate.classList.remove("is-valid");
  };


  
  console.log("Task Name :" + validateName.value.length);
   // Form validation for Task Name Field min length 8
   if (validateName.value.length > 8) {
    validateName.classList.add("is-valid");
    validateName.classList.remove("is-invalid");
  } else {
    validateName.classList.add("is-invalid");
    validateName.classList.remove("is-valid");
    validationFail++;
  }

  console.log("Task Description :" + validateDescription.value.length);
   // Form validation for Task Description Field min length 12
   if (validateDescription.value.length > 12) {
    validateDescription.classList.add("is-valid");
    validateDescription.classList.remove("is-invalid");
  } else {
    validateDescription.classList.add("is-invalid");
    validateDescription.classList.remove("is-valid");
    validationFail++;
  }

  console.log("Task Assigned To :" + validateAssignedTo.value.length);
  // Form validation for Task Assigned To Field min length 4
  if (validateAssignedTo.value.length > 4) {
    validateAssignedTo.classList.add("is-valid");
    validateAssignedTo.classList.remove("is-invalid");
  } else {
    validateAssignedTo.classList.add("is-invalid");
    validateAssignedTo.classList.remove("is-valid");
    validationFail++;
  }

  
  console.log("Task Due Date :" + validateDueDate.value);
   
  // try your own validation for a date in the future
   if (validateDueDate.value) {
    validateDueDate.classList.add("is-valid");
    validateDueDate.classList.remove("is-invalid");
  } else {
    validateDueDate.classList.add("is-invalid");
    validateDueDate.classList.remove("is-valid");
    validationFail++;
  }  

  console.log("Task Status:" + validateStatus.value);
  if (validateStatus.value) {
    validateStatus.classList.add("is-valid");
    validateStatus.classList.remove("is-invalid");
  } else {
    validateStatus.classList.add("is-invalid");
    validateStatus.classList.remove("is-valid");
    validationFail++;
  }
  
  // If validation fails then function will not proceed further and
  // will return. The value of validationFail will also needed to be
  // reset to 0.
  // ----------------------------------------------------------------------------------
  if (validationFail > 0) {
    validationFail = 0;
    return;
  } else {
    // Push the valid input into our tasks array
    taskManager.addTask(
      validateName.value,
      validateDescription.value,
      validateAssignedTo.value,
      validateDueDate.value,
      validateStatus.value
    );
    clearFormFields();
    taskManager.render();
  } 
});
