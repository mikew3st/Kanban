'use strict';

// Kanban Board variables
const tasks = document.querySelectorAll('.task');
const taskSwimlanes = document.querySelectorAll('.task-status-swimlane');
let moveTask = null;

// Modal window variables
const addTaskButton = document.querySelectorAll('[data-target-modal]');
const closeWindowButton = document.querySelector('.close-modal-window-btn');
const overlay = document.querySelector('.overlay');

// Al drag functions
function taskDragStart() {
  moveTask = this;
}
function taskDragEnd() {
  moveTask = null;
}
function taskDragOver(e) {
  e.preventDefault();
}
function taskDragEnter() {
  this.style.border = '2px solid #BFC0C0';
}
function taskDragLeave() {
  this.style.border = 'none';
}
function taskDrop() {
  this.appendChild(moveTask);
  this.style.border = 'none';
}

// Add drag function to all tasks
tasks.forEach((task) => {
  task.addEventListener('dragstart', taskDragStart);
  task.addEventListener('dragend', taskDragEnd);
});

// Add drag functions to swimlanes
taskSwimlanes.forEach((status) => {
  status.addEventListener('dragover', taskDragOver);
  status.addEventListener('dragenter', taskDragEnter);
  status.addEventListener('dragleave', taskDragLeave);
  status.addEventListener('drop', taskDrop);
});

addTaskButton.forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelector(button.dataset.targetModal).classList.add('active');
    overlay.classList.add('active');
  });
});

closeWindowButton.addEventListener('click', () => {
  closeWindowButton.closest('.modal-window').classList.remove('active');
  overlay.classList.remove('active');
  // Alternative way
  // document.querySelector(button.dataset.target).classList.remove('active');
});

window.onclick = (e) => {
  if (e.target == overlay) {
    const modalWindows = document.querySelectorAll('.modal-window');
    modalWindows.forEach((modal) => modal.classList.remove('active'));
    overlay.classList.remove('active');
  }
};

// Create new task variables
const submitNewTask = document.getElementById('taskSubmit');
const newTaskForm = document.getElementById('addTaskForm');
const taskCloseButton = document.querySelectorAll('.close');

submitNewTask.addEventListener('click', createNewTask);

function createNewTask() {
  const newTaskDiv = document.createElement('div');
  const taskTitle = document.getElementById('taskTitle').value;
  const divContent = document.createTextNode(taskTitle);
  const defaultSwimlane = document.getElementById('defaultSwimlane');

  //   Create the div
  newTaskDiv.appendChild(divContent);
  newTaskDiv.classList.add('task');
  newTaskDiv.setAttribute('draggable', 'true');

  // Create the span (close button)
  const span = document.createElement('span');
  const span_text = document.createTextNode('\u00D7');
  span.classList.add('close');
  span.appendChild(span_text);

  //   Add span into div
  newTaskDiv.appendChild(span);

  //   Add div into default swimlane
  defaultSwimlane.appendChild(newTaskDiv);

  // Delete task
  span.addEventListener('click', () => {
    span.parentElement.style.display = 'none';
  });

  // Assign draggable events to new tasks
  newTaskDiv.addEventListener('dragstart', taskDragStart);
  newTaskDiv.addEventListener('dragend', taskDragEnd);

  document.getElementById('taskTitle').value = '';
  newTaskForm.classList.remove('active');
  overlay.classList.remove('active');
}

taskCloseButton.forEach(function (task) {
  task.addEventListener('click', () => {
    task.parentElement.style.display = 'none';
  });
});
