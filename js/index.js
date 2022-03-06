//Initiate, load and render the weather
const profileManager = new ProfileManager('Stranger', 'Sydney');
profileManager.load()
profileManager.render()

//Initiate, load and render the data
const taskManager = new TaskManager();
taskManager.load()
taskManager.render()

// Find and Display the Date Object starts
const dateElement = document.querySelector("#date-element");
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let today = new Date();
const [day, month, year] = [today.getDate(), today.getMonth(), today.getFullYear()];
let dateString = `Today: ${day} ${monthNames[month]} ${year}`;
dateElement.innerHTML = dateString;

// Form validation
const addTaskForm = document.querySelector('#addToDo');

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
        taskManager.render()
        taskManager.save()

        addTaskForm.reset()
        $('#addTaskModal').modal('hide')
        $('.is-valid').removeClass('is-valid')
    }
})

function isNotEmpty(value) {
    return value !== "" && value !== null && value !== undefined;
}

function isGreaterThan(value, length) {
    return value.length > length;
}

function isGreaterThanToday(date) {
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

// As we have multiple task lists we get the tab content to ensure all task lists are cater for.
const tabContainer = document.querySelector('.tab-content');

tabContainer.addEventListener('click', function (event) {
    if (event.target.classList.contains('done-button')) {
        const parentTask = event.target.parentElement.parentElement.parentElement.parentElement.parentElement
        const taskId = Number(parentTask.dataset.taskId)
        const task = taskManager.getTaskById(taskId)
        task.status = "DONE"

        taskManager.save()
        taskManager.render()
    }
    if (event.target.classList.contains('delete-button')) {
        const parentTask = event.target.parentElement.parentElement.parentElement.parentElement.parentElement
        const taskId = Number(parentTask.dataset.taskId)
        taskManager.deleteTask(taskId);

        taskManager.save()
        taskManager.render()
    }
})

// https://stackoverflow.com/questions/42834154/changing-bootstrap-button-text-on-toggle
$('#toggleAccordion').on('click', function () {
    let text = $('#toggleAccordion').text();
    if (text === 'Open All') {
        $(".collapse").collapse("show");
        $(this).text('Close All');
        $(this).removeClass("btn-info border-info")
        $(this).addClass("btn-secondary border-secondary")
    } else {
        $(".collapse").collapse("hide");
        $(this).text('Open All');
        $(this).removeClass("btn-secondary border-secondary")
        $(this).addClass("btn-info border-info")
    }
});

// start button
const btnStart = document.querySelector('#btnStart');
btnStart.addEventListener('click', function () {
    let firstNameInput = document.querySelector('#firstNameInput').value
    if (firstNameInput) {
        profileManager.name = firstNameInput
    }
    let cityInput = document.querySelector('.search-city').value
    if (cityInput) {
        profileManager.location = cityInput
    }
    displayManager()
    profileManager.render()
    profileManager.save()
})

// edit profile button
const btn = document.querySelector('#btnEdit');
btn.addEventListener('click', function () {
    profileManager.delete()
    hideManager()
})

// change background button	
const btnBg = document.querySelector('#bgEdit');
btnBg.addEventListener('click', function () {
    const { location } = profileManager.getProfile();
    setBackground(location);
})
