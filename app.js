const STORAGE_KEY = "tasks";
 
function saveTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}
 
function loadTasks() {
  const json = localStorage.getItem(STORAGE_KEY);
  return json ? JSON.parse(json) : [];
}
 
function renderTasks() {
  const tasks = loadTasks();
  const board = document.getElementById("task-board");
  board.innerHTML = "";
 
  for (const task of tasks) {
    const card = document.createElement("div");
    card.className = "task-card";
    card.innerHTML = `
      <p>${task.text}</p>
      <small>${task.date} <br> ${task.time}</small>
      <span class="delete-btn" onclick="deleteTask(${task.id})">
        <i class="bi bi-x-circle"></i>
      </span>
    `;
    board.appendChild(card);
    setTimeout(() => card.classList.add("show"), 10);
  }
}
 
document.getElementById("task-form").addEventListener("submit", function (event) {
  event.preventDefault();
 
  const text = document.getElementById("task-text").value.trim();
  const date = document.getElementById("task-date").value;
  const time = document.getElementById("task-time").value;
 
  if (!text || !date || !time) return;
 
  const task = {
    id: Date.now(),
    text,
    date,
    time
  };
 
  const tasks = loadTasks();
  tasks.push(task);
  saveTasks(tasks);
  renderTasks();
  event.target.reset();
});
function deleteTask(id) {
    const tasks = loadTasks().filter(task => task.id !== id);
    saveTasks(tasks);
    renderTasks();
  }
  const today = new Date().toISOString().split("T")[0];
document.getElementById("task-date").min = today;
 
const timeInput = document.getElementById("task-time");
const now = new Date();
timeInput.min = now.toTimeString().slice(0, 5);
 
 
 
renderTasks();