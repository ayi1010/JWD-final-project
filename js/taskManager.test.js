// Question: why not test createTaskHtml?

const assert = require('assert');
const { TaskManager } = require('./taskManager');

// test TaskManager constructor
describe('TaskManager', () => {
  describe('#constructor', () => {
    describe('when initializing a new TaskManager', () => {
      // beforeEach(() => {
      //   const taskManager = new TaskManager(1);
      // })
      it('should create an empty tasks array', () => {
        const taskManager = new TaskManager(1);
        assert.deepStrictEqual(taskManager.tasks, []);
        // Q. I don't need to tear down?
      });
      it('should set the currentId to the passed in number', () => {
        const taskManager = new TaskManager(1);
        assert.strictEqual(taskManager.currentId, 1);
      });
    });
  });
  describe('#addTask', () => {
    describe('passing new task data as parameters', () => {
      it('should add the task to the tasks array', () => {
        const taskManager = new TaskManager(2);

        const task = {
          id: taskManager.currentId,
          name: 'test',
          description: 'test',
          assignedTo: 'test',
          dueDate: Date.now(),
          status: 'TODO'
        };

        taskManager.addTask(task.name, task.description, task.assignedTo, task.dueDate, task.status);

        assert.deepStrictEqual(taskManager.tasks[0], task);
      });

      it('should increment the currentId property', () => {
        const taskManager = new TaskManager(10);

        const task = {
          id: taskManager.currentId,
          name: 'test',
          description: 'test',
          assignedTo: 'test',
          dueDate: Date.now(),
          status: 'TODO'
        };

        taskManager.addTask(task.name, task.description, task.assignedTo, task.dueDate, task.status);

        assert.strictEqual(taskManager.currentId, 11);
      });
    });
  });
  // test getTaskById
  describe('#getTaskById', () => {
    describe('when passed an existing taskId', () => {
      it('should return the task', () => {
        const taskManager = new TaskManager();

        const task = {
          id: taskManager.currentId,
          name: 'test',
          description: 'test',
          assignedTo: 'test',
          dueDate: Date.now(),
          status: 'TODO'
        };

        taskManager.addTask(task.name, task.description, task.assignedTo, task.dueDate, task.status);

        const result = taskManager.getTaskById(task.id);

        assert.deepStrictEqual(result, task);
      });
    });
  });
});

// test save


// test load


// test deleteTask


// test render






