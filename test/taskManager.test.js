const { assert, expect } = require('chai')
const sinon = require('sinon');
const { TaskManager, createTaskHtml } = require('../js/taskManager');

const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const fs = require('fs')
const path = require('path')
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

// const { window } = new JSDOM(`html`, { url: "http://localhost" })

// test TaskManager constructor
describe('TaskManager', () => {
  let dom;
  before(async function () {
    dom = await new JSDOM(html, { runScripts: 'dangerously', url: 'https://localhost' })
    await new Promise(resolve =>
      dom.window.addEventListener("load", resolve)
    );
    //  Mocking localStorage function
    let localStorage = {
      getItem: function (key) {
        const value = this[key];
        return typeof value === 'undefined' ? null : value;
      },
      setItem: function (key, value) {
        this[key] = value;
      }
    };
    // set globals for mocha
    global.localStorage = localStorage;
    global.document = dom.window.document;
  });
  beforeEach(function () {
    sinon.restore()
  });
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
        assert.deepEqual(localStorageSpy.firstCall.args, ['tasks', tasksJson]);
      });

      it('should store the currentId in local storage', () => {
        const taskManager = new TaskManager();

        taskManager.addTask('test', 'test', 'test', Date.now(), 'TODO');

        // spy on the localStorage
        const localStorageSpy = sinon.spy(localStorage, 'setItem');

        // call save
        taskManager.save();

        // create string of the currentId
        const currentId = new String(taskManager.currentId);

        // check if localStorage was called last with the currentId key and the currentId
        assert.deepEqual(localStorageSpy.lastCall.args, ['currentId', currentId]);
      });
    });
  });
  // test load
  describe('#load', () => {
    describe('when tasks are saved in localStorage', () => {
      it('should set the tasks array to the saved tasks', () => {
        const taskManager = new TaskManager();

        const task = {
          id: taskManager.currentId,
          name: 'test',
          description: 'test',
          assignedTo: 'test',
          dueDate: Date.now(),
          status: 'TODO'
        };

        // create a tasks array
        const tasks = [task];

        // create JSON of the tasks array
        const tasksJson = JSON.stringify(tasks);

        // spy on localStorage.getItem() and return the tasksJson.
        sinon.stub(localStorage, 'getItem').returns(tasksJson);

        // call load
        taskManager.load();

        assert.deepEqual(taskManager.tasks, tasks);
      });
    });
    describe('when the currentId is saved in localStorage', () => {
      it('should set the currentId to the saved currentId', () => {
        const taskManager = new TaskManager();

        // spy on localStorage.getItem() and return a currentId as a string.
        sinon.stub(localStorage, 'getItem').returns('1');

        // call load
        taskManager.load();
        const id = new Number('1')
        expect(taskManager.currentId).to.deep.equal(id);
      });
    });
  });
  // test deleteTask
  describe('#deleteTask', () => {
    describe('when passed an existing taskId', () => {
      it('should remove the task from the tasks array', () => {
        const taskManager = new TaskManager();

        const taskToDelete = {
          id: taskManager.currentId,
          name: 'test',
          description: 'test',
          assignedTo: 'test',
          dueDate: Date.now(),
          status: 'TODO'
        };

        taskManager.addTask(taskToDelete.name, taskToDelete.description, taskToDelete.assignedTo, taskToDelete.dueDate, taskToDelete.status);
        taskManager.addTask('feed puppy', 'feed the puppy a heathy meal', 'nick', Date.now(), 'TODO');

        taskManager.deleteTask(taskToDelete.id);

        expect(taskManager.tasks).to.not.include(taskToDelete);
      });
    });
  });

  // test render
  describe('#render', () => {
    describe('when tasks exist in the task manager', () => {
      it('should render the test in the innerHTML of the tasksList', () => {
        const taskManager = new TaskManager();

        const task = {
          id: taskManager.currentId,
          name: 'test',
          description: 'test',
          assignedTo: 'test',
          // use a specific date to make it easier to check html
          dueDate: 1601451685812,
          status: 'TODO'
        };

        const currentDate = new Date(task.dueDate)
        const formattedDate = currentDate.getDate() + '/' + (currentDate.getMonth() + 1) + '/' + currentDate.getFullYear();

        const todoTaskHtml = createTaskHtml(task.id, task.name, task.description, task.assignedTo, formattedDate, task.status);

        taskManager.addTask(task.name, task.description, task.assignedTo, task.dueDate, task.status);
        taskManager.render();

        const toDoTasksList = document.getElementById('toDoList');
        // test taskList html has rendered correctly
        expect(toDoTasksList.innerHTML).to.equal(todoTaskHtml)
      });
    });
  });
});








