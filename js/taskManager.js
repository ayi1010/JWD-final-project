const createTaskHtml = (id, name, description, assignedTo, dueDate, status) => {
    const html = `
        <div data-task-id="${id}">
            <a href="#task${id}" data-parent="#accordion" data-toggle="collapse" class="list-group-item d-flex text-decoration-none">
                <h6 class="flex-grow-1">Task: ${name}</h6>
            </a>
            <div class="collapse" id="task${id}">
                <div class="card h-100">
                    <div class="card-body">
                        <p class="card-text">
                            <ul class="list-group-item-text">
                                <li class="font-weight-bold">Description</li>
                                <p>${description}</p>
                                <li class="font-weight-bold">Assign To</li>
                                <p>${assignedTo}</p>
                                <li class="font-weight-bold">Due Date</li>
                                <p>${dueDate}</p>
                                <li class="font-weight-bold">Status</li>
                                <p class="${status === "DONE" ? 'text-danger' : status === "IN PROGRESS" ? 'text-warning' : 'text-primary'}">${status}</p>
                            </ul>
                        </p>
                        <div class="d-flex justify-content-end">
                            <button type="button" class="btn btn-success btn-sm done-button mr-1  ${(status === "DONE") ? "invisible" : "visible"}">Mark as Done</button>
                            <button type="button" class="btn btn-danger btn-sm delete-button">DELETE</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
    return html;
}

function createNotification(taskList, badge) {
    if (taskList.children.length === 0 || taskList.children.length === null) {
        badge.innerText = ""
    } else {
        badge.innerText = taskList.children.length
    }
}

class TaskManager {
    constructor(currentId = 0) {
        this.currentId = currentId;
        this.tasks = [];
    }
    addTask(name, description, assignedTo, dueDate, status) {
        const task = {
            id: this.currentId++,
            name: name,
            description: description,
            assignedTo: assignedTo,
            dueDate: dueDate,
            status: status
        }
        this.tasks.push(task)
    }
    getTaskById(taskId) {
        let foundTask;
        for (let i = 0; i < this.tasks.length; i++) {
            const task = this.tasks[i]
            if (task.id === taskId) {
                foundTask = task
            }
        }
        return foundTask;
    }
    save() {
        const tasksJson = JSON.stringify(this.tasks)
        localStorage.setItem("tasks", tasksJson)
        const currentId = new String(this.currentId)
        localStorage.setItem("currentId", currentId)
    }
    load() {
        if (localStorage.getItem("tasks")) {
            const tasksJson = localStorage.getItem("tasks")
            this.tasks = JSON.parse(tasksJson)
            if (localStorage.getItem("currentId")) {
                const currentId = localStorage.getItem("currentId")
                this.currentId = new Number(currentId)
            }
        }
    }
    deleteTask(taskId) {
        const newTasks = [];
        for (let i = 0; i < this.tasks.length; i++) {
            const task = this.tasks[i];
            if (task.id !== taskId) {
                newTasks.push(task)
            }
        }
        this.tasks = newTasks;
    }
    render() {
        const toDoTasksHtmlList = [];
        const inProgressTasksHtmlList = [];
        const reviewTasksHtmlList = [];
        const doneTasksHtmlList = [];

        for (let i = 0; i < this.tasks.length; i++) {

            const currentTask = this.tasks[i];
            const currentDate = new Date(currentTask.dueDate)
            const formattedDate = currentDate.getDate() + '/' + (currentDate.getMonth() + 1) + '/' + currentDate.getFullYear();

            const taskHtml = createTaskHtml(
                currentTask.id,
                currentTask.name,
                currentTask.description,
                currentTask.assignedTo,
                formattedDate,
                currentTask.status
            );

            switch (currentTask.status) {
                case "DONE":
                    doneTasksHtmlList.push(taskHtml);
                    break;
                case "IN PROGRESS":
                    inProgressTasksHtmlList.push(taskHtml);
                    break;
                case "REVIEW":
                    reviewTasksHtmlList.push(taskHtml);
                    break;
                default:
                    toDoTasksHtmlList.push(taskHtml);
            }
        }

        const doneTaskHtml = doneTasksHtmlList.join('\n');
        const inProgressTaskHtml = inProgressTasksHtmlList.join('\n');
        const reviewTaskHtml = reviewTasksHtmlList.join('\n');
        const todoTaskHtml = toDoTasksHtmlList.join('\n');

        const doneTasksList = document.getElementById('doneList');
        const inProgressTasksList = document.getElementById('inProgressList');
        const reviewTasksList = document.getElementById('reviewList');
        const toDoTasksList = document.getElementById('toDoList');

        doneTasksList.innerHTML = doneTaskHtml;
        inProgressTasksList.innerHTML = inProgressTaskHtml;
        reviewTasksList.innerHTML = reviewTaskHtml;
        toDoTasksList.innerHTML = todoTaskHtml;

        // notification badge
        const toDoBadge = document.querySelector("#toDoBadge")
        const inProgressBadge = document.querySelector("#inProgressBadge")
        const reviewBadge = document.querySelector("#reviewBadge")
        const doneBadge = document.querySelector("#doneBadge")

        createNotification(toDoTasksList, toDoBadge)
        createNotification(inProgressTasksList, inProgressBadge)
        createNotification(reviewTasksList, reviewBadge)
        createNotification(doneTasksList, doneBadge)

        //enable the open & close accordion button
        const toggleAccordion = document.querySelector('#toggleAccordion')
        if (this.tasks.length > 0) {
            toggleAccordion.classList.add('visible')
            toggleAccordion.classList.remove('invisible')
        } else {
            toggleAccordion.classList.remove('visible')
            toggleAccordion.classList.add('invisible')
        }
    }
}

module.exports = {
    TaskManager
}

