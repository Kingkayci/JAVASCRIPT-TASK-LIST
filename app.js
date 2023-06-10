// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

// load all event listeners
function loadEventListeners() {
    // DOM load event
    document.addEventListener('DOMContentLoaded', getTasks);
    // Add task event
    form.addEventListener('submit', addTask);
    // Remove task Event
    taskList.addEventListener('click', removeTask);
    // Clear tasks
    clearBtn.addEventListener('click', clearTasks);
    // Filter tasks
    filter.addEventListener('keyup', filterTasks);
}

// DOM load tasks
function getTasks (task) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        // Create li
        const li = document.createElement('li');
        // Give li class
        li.className = 'collection-item';
        // Create li text node and append
        li.appendChild(document.createTextNode(task));
        // create link
        const link = document.createElement('a');
        // Give link a class name
        link.className = 'delete-item secondary-content';
        // Give link an inner HTML
        link.innerHTML = '<i class="fa fa-remove"></i>';
        // Append link to li
        li.appendChild(link);
        // Append li to ul
        taskList.appendChild(li);
    })
}



function addTask(e) {
    if (taskInput.value === '') {
        alert('Add a task');
    }
    // Create li
    const li = document.createElement('li');
    // Give li class
    li.className = 'collection-item';
    // Create li text node and append
    li.appendChild(document.createTextNode(taskInput.value));
    // create link
    const link = document.createElement('a');
    // Give link a class name
    link.className = 'delete-item secondary-content';
    // Give link an inner HTML
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append link to li
    li.appendChild(link);
    // Append li to ul
    taskList.appendChild(li);

    // Store tasks in local storage
    storeTaskInLocalStorage(taskInput.value);

    e.preventDefault();
}

// Store tasks in LS
function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}



// Remove task
function removeTask (e) {
    if (e.target.parentElement.classList.contains('delete-item')){
        if (confirm('Are you sure')){
            e.target.parentElement.parentElement.remove();
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);            
        }
    }
}

// Remove task from Local storage
function removeTaskFromLocalStorage (taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index) {
        if(taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));

} 
// Clear tasks
function clearTasks(e){
    // taskList.innerHTML = '';

    // OR USING WHILE LOOP
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    // Clear task from Local storage
    clearTaskFromLocalStorage();
}

function clearTaskFromLocalStorage() {
    localStorage.clear();
}

// Filter tasks
function filterTasks(e) {
    const text = e.target.value.toLowerCase();
    
    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        }
        else {
            task.style.display = 'none';
        }
    })
}
