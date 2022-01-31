const createTaskHtml = (id, name, description, assignedTo, dueDate, status) => {
    const html = `
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
                        <p>${status}</p>
                    </ul>
                </p>
                <div class="d-flex justify-content-end">
                <button type="button" class="btn btn-success btn-sm mr-1" data-toggle="modal" data-target="#editTaskModal">EDIT</button>
                <button type="button" class="btn btn-danger btn-sm">DELETE</button>
                </div>
            </div>
        </div>
    </div>
`;
    return html;
}

class TaskManager {
    constructor(currentId = 0) {
        this.currentId = currentId;
        this._tasks = [];
    }
    get tasks() {
        return this._tasks
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
                case "done":
                    doneTasksHtmlList.push(taskHtml);
                    break;
                case "inProgress":
                    inProgressTasksHtmlList.push(taskHtml);
                    break;
                case "review":
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
        const todoTasksList = document.getElementById('toDoList');


        doneTasksList.innerHTML = doneTaskHtml;
        inProgressTasksList.innerHTML = inProgressTaskHtml;
        reviewTasksList.innerHTML = reviewTaskHtml;
        todoTasksList.innerHTML = todoTaskHtml;
    }
}

