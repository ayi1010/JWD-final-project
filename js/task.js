class Task {
    constructor(id, name, description, assignedTo, dueDate, status) {
        this._task = {
            id: id,
            name: name,
            description: description,
            assignedTo: assignedTo,
            dueDate: dueDate,
            status: status
        };
    }

    get returnTask() {
        return this._task;
    }
}