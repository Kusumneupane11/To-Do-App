let inputs = document.getElementById("inp");
let text = document.querySelector(".text");

// Function to load tasks from localStorage
function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        createTaskElement(task);
    });
}

// Function to save tasks to localStorage
function saveTasks() {
    let taskElements = document.querySelectorAll(".text li");
    let tasks = [];
    taskElements.forEach(taskElement => {
        tasks.push(taskElement.textContent.trim());
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to create task element
function createTaskElement(taskText) {
    let newTask = document.createElement("li");
    newTask.textContent = taskText;
    newTask.innerHTML += ` <i class="fa fa-trash trash-icon"></i>`;
    text.appendChild(newTask);

    // Event delegation for handling trash icon clicks
    newTask.addEventListener("click", function(event) {
        if (event.target && event.target.matches(".trash-icon")) {
            newTask.remove();
            saveTasks(); // Update localStorage after removing task
        }
    });
}

// Add task function
function Add() {
    let task = inputs.value.trim();

    if (task === "") {
        alert("Please enter a task!!");
    } else {
        createTaskElement(task);
        saveTasks(); // Save task to localStorage
        inputs.value = "";
    }
}

// Load tasks when the page is loaded
document.addEventListener("DOMContentLoaded", function() {
    loadTasks();
});
