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
        this.tasks.push({ task }) //question mark.
    }
}

