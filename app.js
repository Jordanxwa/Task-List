// Define UI Vars
const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const taskList = document.querySelector('.collection');
const filter = document.querySelector('#filter');
const clearButton = document.querySelector('.clear-tasks');

// Load All Event Listeners
loadAllEventListeners();

function loadAllEventListeners() {
  // DOM Load Event
  document.addEventListener('DOMContentLoaded', getTasks);
  // Add task event
  form.addEventListener('submit', addTask);
  // Remove task event
  taskList.addEventListener('click', removeTask);
  // Clear All Tasks
  clearButton.addEventListener('click', clearTasks);
  // Filter Through Tasks
  filter.addEventListener('keyup', filterTasks);
}

// Get Tasks From LS
function getTasks() {
  let tasks;
  // If tasks in LS is empty
  if (localStorage.getItem('tasks') === null) {
    // Set to array
    tasks = [];
  } else {
    // Parse tasks as JSON and set it to what it is
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function (task) {
    // Create Li Element
    const li = document.createElement('li');
    // Add Class
    li.className = 'collection-item';
    // Create Text Node & Append To Li
    li.appendChild(document.createTextNode(task));
    // Create New Link Element
    const link = document.createElement('a');
    // Add Class
    link.className = 'delete-item secondary-content';
    // Add Icon HTML
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append Link To Li
    li.appendChild(link);
    // Append Li To Ul
    taskList.appendChild(li);
  });
}

// Add Task
function addTask(e) {
  if (taskInput.value === '') {
    alert('Add A Task!');
  } else {
    // Create Li Element
    const li = document.createElement('li');
    // Add Class
    li.className = 'collection-item';
    // Create Text Node & Append To Li
    li.appendChild(document.createTextNode(taskInput.value));
    // Create New Link Element
    const link = document.createElement('a');
    // Add Class
    link.className = 'delete-item secondary-content';
    // Add Icon HTML
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append Link To Li
    li.appendChild(link);
    // Append Li To Ul
    taskList.appendChild(li);

    // Store Task In LS
    storeTaskInLocalStorage(taskInput.value);

    // Clear Input After Adding
    taskInput.value = '';
  }
  // Prevents Page From Refreshing
  e.preventDefault();
}

// Store Task
function storeTaskInLocalStorage(task) {
  let tasks;
  // If tasks in LS is empty
  if (localStorage.getItem('tasks') === null) {
    // Set to array
    tasks = [];
  } else {
    // Parse tasks as JSON and set it to what it is
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  // Push new tasks to end of array
  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove Task
function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are you sure?')) {
      e.target.parentElement.parentElement.remove();

      // Remove From LS
      removeTasksFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// Remove From LS
function removeTasksFromLocalStorage(taskItem) {
  let tasks;
  // If tasks in LS is empty
  if (localStorage.getItem('tasks') === null) {
    // Set to array
    tasks = [];
  } else {
    // Parse tasks as JSON and set it to what it is
    tasks = JSON.parse(localStorage.getItem('tasks'));

    // Filter Through
    tasks.forEach(function (task, index) {
      // If TI text content matches task
      if (taskItem.textContent === task) {
        // Delete
        tasks.splice(index, 1);
      }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}

// Clear All Tasks
function clearTasks() {
  // taskList.innerHTML = '';

  // Faster Way
  // While there is still the first child in the UL
  while (taskList.firstChild) {
    // Remove the first child in UL
    taskList.removeChild(taskList.firstChild);
  }

  // Clear All Tasks From LS
  clearTasksFromLocalStorage();
}

// Clear All Tasks From LS
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

// Filter Tasks
function filterTasks(e) {
  // Create var for target val, set to lowercase
  const text = e.target.value.toLowerCase();

  // Select all Lis, filter through
  document.querySelectorAll('.collection-item').forEach(function (task) {
    // Create var for iterators FC TC
    const item = task.firstChild.textContent;

    // If item's index text doesn't match the target value
    if (item.toLowerCase().indexOf(text) != -1) {
      // Display
      task.style.display = 'block';
    } else {
      // Don't Display
      task.style.display = 'none';
    }
  });
}
