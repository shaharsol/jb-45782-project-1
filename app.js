const TASKS_KEY_NAME = "tasks";
let count = 0;
const existingTasks = JSON.parse(localStorage.getItem(TASKS_KEY_NAME) || "[]");
count = existingTasks.length;

function addTaskToBoard(event) {
    event.preventDefault();
    const data = collectDataFromForm();
    const newTask = generateNewTask(data, count);
    count++;
    document.getElementById("tasks-container").innerHTML = ""; // for erasing fade-in from old notes 
    loadTasksFromStorage();  // (not most efficient but with what wev'e learned so far it seems to be the only way to do it)
    injectTaskToDOM(newTask);
    saveTaskToLocalStorage(data);
    clearForm();
}

function collectDataFromForm() {
    const task = document.getElementById("task-info").value;
    const time = document.getElementById("date").value;
    const date = document.getElementById("due-time").value;

    return {
        task,
        time,
        date,
    };
}
function generateNewTask(data, count) {
    const { task, time, date } = data;
    const newDIV = `
                <div class="task-container fade-in">
                <br><br>
                <p class="notes-parag">
                ${task}
                </p>
                <button id="buttonX" type="button" class="btn-close" onClick="eraseNote(${count})"></button>
                <span> ${date} </span>
                <span> ${time}</span>
            </div>
    `;
    return newDIV;
}
function generateTask(data, count) {
    const { task, time, date } = data;
    const newDIV = `
                <div class="task-container">
                <br><br>
                <p class="notes-parag">
                ${task}
                </p>
                <button id="buttonX" type="button" class="btn-close" onClick="eraseNote(${count})"></button>
                <span> ${date} </span>
                <span> ${time}</span>
            </div>
    `;
    return newDIV;
}
function eraseNote(count) {
    const tasksJSON = localStorage.getItem(TASKS_KEY_NAME);
    const tasks = JSON.parse(tasksJSON);
    tasks.splice(count, 1);
    localStorage.setItem(TASKS_KEY_NAME, JSON.stringify(tasks));
    document.getElementById("tasks-container").innerHTML = "";
    loadTasksFromStorage();
}

function injectTaskToDOM(newTask) {
    document.getElementById("tasks-container").innerHTML += newTask;
}

function saveTaskToLocalStorage(task) {
    const tasksJSON = localStorage.getItem(TASKS_KEY_NAME) || "[]";
    const tasks = JSON.parse(tasksJSON);
    tasks.push(task);
    localStorage.setItem(TASKS_KEY_NAME, JSON.stringify(tasks));
}

function loadTasksFromStorage() {
    const tasksJSON = localStorage.getItem(TASKS_KEY_NAME);
    if (tasksJSON) {
        const tasks = JSON.parse(tasksJSON);
        for (let i = 0; i < tasks.length; i++) {
            const newTask = generateTask(tasks[i], i);
            injectTaskToDOM(newTask);
        }
    }
}

function clearForm() {
    document.getElementById("task-form").reset();
}

loadTasksFromStorage();