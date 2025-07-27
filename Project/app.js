const TASKS_KEY_NAME = "tasks";

function addTask(event){
    event.preventDefault();
    const data = collectDataFromForm();
    const tasksJSON = localStorage.getItem(TASKS_KEY_NAME);
    const taskId = tasksJSON ? JSON.parse(tasksJSON).length : 0;
    AddsNote(data, 1);
    saveTaskToLocalStorage(data);
    clearForm();
}

function collectDataFromForm(){

const taskDetails = document.getElementById("taskDetails").value;
const DueDate = document.getElementById("DueDate").value;
const deadLine = document.getElementById("deadLine").value;

return{
    id: Date.now(),
    taskDetails,
    DueDate,
    deadLine,
    }
}

function AddsNote(data, animate){
    const newNote = document.createElement("div");
    newNote.classList.add("task-note");
    newNote.innerHTML = `
    <button class = "delete-note" onclick="deleteTask(${data.id})">X</button>
  <p class = "note-task">${data.taskDetails}</p>
  <p class ="note-date">${data.DueDate} <br>${data.deadLine}</p>
  
`;
if(animate){
    newNote.classList.add("fade-in");
}
  document.getElementById("notes-container").appendChild(newNote);

}

function loadTasksFromStorage() {
  document.getElementById("notes-container").innerHTML = "";

  const tasksJSON = localStorage.getItem(TASKS_KEY_NAME);
  if (tasksJSON) {
    const tasks = JSON.parse(tasksJSON);
    tasks.forEach((task) => {
      AddsNote(task, 0);
});
  }
}

function saveTaskToLocalStorage(task) {
  const tasksJSON = localStorage.getItem(TASKS_KEY_NAME) || "[]";
  const tasks = JSON.parse(tasksJSON);
  tasks.push(task);
  localStorage.setItem(TASKS_KEY_NAME, JSON.stringify(tasks));
}

function clearForm() {
  document.getElementById("task-form").reset();
}

function deleteTask(id) {
  const tasksJSON = localStorage.getItem(TASKS_KEY_NAME);
  let tasks = JSON.parse(tasksJSON) || [];
  tasks = tasks.filter(task => task.id !== id);
  localStorage.setItem(TASKS_KEY_NAME, JSON.stringify(tasks));
  loadTasksFromStorage();
}


loadTasksFromStorage()