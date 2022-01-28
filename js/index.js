//Task6 starts
const taskManager = new TaskManager(0);
const aaaaa = taskManager
console.log(aaaaa)


// Task5: Finding and Display the Date Object starts
const dateElement = document.querySelector("#date-element");
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let today = new Date();
const [day, month, year] = [today.getDate(), today.getMonth(), today.getFullYear()];
let dateString = `Today: ${day} / ${monthNames[month]} / ${year}`;
dateElement.innerHTML = dateString;
// Task5: Finding and Display the Date Object ends

// Task4: Form validation starts
const addTaskForm = document.querySelector('#addToDo');
const editTaskForm = document.querySelector('#editToDo');

addTaskForm.addEventListener('submit', (event) => {
    event.preventDefault();
    event.stopPropagation();

    const newTaskName = document.querySelector('#newTaskName');
    const newTaskDescription = document.querySelector('#newTaskDescription');
    const newTaskAssignedTo = document.querySelector('#newTaskAssignedTo');
    const newTaskDueDate = document.querySelector('#newTaskDueDate');
    const newTaskStatus = document.querySelector('#newTaskStatus');

    console.log("Task Name :" + newTaskName.value.length);
    console.log("Task Description :" + newTaskDescription.value.length);
    console.log("Task Assigned To :" + newTaskAssignedTo.value.length);
    console.log("Task Due Date :" + newTaskDueDate.value);
    console.log("Task Status:" + newTaskStatus.value);

    const isValid = validateTaskForm(newTaskName, newTaskDescription, newTaskAssignedTo, newTaskDueDate, newTaskStatus);

    if (isValid) {
        // Get the values of the inputs
        const name = newTaskName.value;
        const description = newTaskDescription.value;
        const assignedTo = newTaskAssignedTo.value;
        const dueDate = newTaskDueDate.value;
        const status = newTaskStatus.value;

        // Add the task to the task manager
        taskManager.addTask(name, description, assignedTo, dueDate, status);

        //reset the form and close the modal
        addTaskForm.reset();
        $('#addTaskModal').modal('hide')
    }
})

editTaskForm.addEventListener('submit', (event) => {
    event.preventDefault();
    event.stopPropagation();

    const editTaskName = document.querySelector('#editTaskName');
    const editTaskDescription = document.querySelector('#editTaskDescription');
    const editTaskAssignedTo = document.querySelector('#editTaskAssignedTo');
    const editTaskDueDate = document.querySelector('#editTaskDueDate');
    const editTaskStatus = document.querySelector('#editTaskStatus');

    console.log("Task Name :" + editTaskName.value.length);
    console.log("Task Description :" + editTaskDescription.value.length);
    console.log("Task Assigned To :" + editTaskAssignedTo.value.length);
    console.log("Task Due Date :" + editTaskDueDate.value);
    console.log("Task Status:" + editTaskStatus.value);

    const isValid = validateTaskForm(editTaskName, editTaskDescription, editTaskAssignedTo, editTaskDueDate, editTaskStatus);

    if (isValid) {
        editTaskForm.reset();
        $('#editTaskModal').modal('hide')
    }
})

function isNotEmpty(value) {
    return value !== "" && value !== null && value !== undefined;
}

function isGreaterThan(value, length) {
    return value.length > length;
}

function isGreaterThanToday(date) {
    //Obtained formula from https://stackoverflow.com/questions/14781153/how-to-compare-two-string-dates-in-javascript/42760898
    const todayDate = new Date().setHours(0, 0, 0, 0);
    return Date.parse(date) >= todayDate
}

function validateTaskForm(name, description, assignedTo, dueDate, status) {
    const nameIsValid = isNotEmpty(name.value) && isGreaterThan(name.value, 5);
    const descriptionIsValid = isNotEmpty(description.value) && isGreaterThan(description.value, 5);
    const assignedToIsValid = isNotEmpty(assignedTo.value) && isGreaterThan(assignedTo.value, 5);
    const dueDateIsValid = isNotEmpty(dueDate.value) && isGreaterThanToday(dueDate.value)
    const statusIsValid = isNotEmpty(status.value)

    if (nameIsValid) {
        name.classList.add("is-valid");
        name.classList.remove("is-invalid")
    } else {
        name.classList.add("is-invalid");
        name.classList.remove("is-valid");
    }
    if (descriptionIsValid) {
        description.classList.add("is-valid");
        description.classList.remove("is-invalid")
    } else {
        description.classList.add("is-invalid");
        description.classList.remove("is-valid");
    }
    if (assignedToIsValid) {
        assignedTo.classList.add("is-valid");
        assignedTo.classList.remove("is-invalid")
    } else {
        assignedTo.classList.add("is-invalid");
        assignedTo.classList.remove("is-valid");
    }
    if (dueDateIsValid) {
        dueDate.classList.add("is-valid");
        dueDate.classList.remove("is-invalid")
    } else {
        dueDate.classList.add("is-invalid");
        dueDate.classList.remove("is-valid");
    }
    if (statusIsValid) {
        status.classList.add("is-valid");
        status.classList.remove("is-invalid")
    } else {
        status.classList.add("is-invalid");
        status.classList.remove("is-valid");
    }
    return nameIsValid && descriptionIsValid && assignedToIsValid && dueDateIsValid && statusIsValid
}
// Task4: Form validation ends


