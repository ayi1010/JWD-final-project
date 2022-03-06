const assert = require('chai').assert
const sinon = require('sinon');
const { TaskManager } = require('../js/taskManager');


// test TaskManager constructor
describe('TaskManager', () => {
  describe('#constructor', () => {
    describe('when initializing a new TaskManager', () => {
      it('should create an empty tasks array', () => {
        const taskManager = new TaskManager(1);
        assert.deepStrictEqual(taskManager.tasks, []);
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
  // test save
  describe('#save', () => {
    describe('when tasks exist in the task manager', () => {
      afterEach(() => {
        sinon.restore();
      })
      it('should store the tasks in local storage', () => {
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

        // create JSON of the task in an array
        const tasksJson = JSON.stringify([task]);

        // spy on the localStorage
        const localStorageSpy = sinon.spy(localStorage, 'setItem');

        // call save
        taskManager.save();

        // check if localStorage was called first with the tasks key and the json
        assert.deepEqual(localStorageSpy.getCalls()[0].args, ['tasks', tasksJson]);
      });

      it('should store the currentId in local storage', () => {
        const taskManager = new TaskManager();

        taskManager.addTask('test', 'test', 'test', Date.now(), 'TODO');

        // spy on the localStorage
        global.localStorage = {}
        const localStorageSpy = sinon.spy(localStorage, 'setItem');

        // call save
        taskManager.save();

        // create string of the currentId
        const currentId = String(taskManager.currentId);

        // check if localStorage was called last with the currentId key and the currentId
        assert.deepEqual(localStorageSpy.lastCall.args, ['currentId', currentId]);
      });
    });
  });
});

// test load


// test deleteTask


// test render






