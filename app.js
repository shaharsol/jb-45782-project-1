let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

renderTasks();

function submitTask(event) {
  event.preventDefault();

  const description = document.getElementById("taskDescription").value;
  const date = document.getElementById("taskDate").value;
  const time = document.getElementById("taskTime").value;

  tasks.push({ description, date, time });
  localStorage.setItem("tasks", JSON.stringify(tasks));

  renderTasks();

  document.getElementById("taskDescription").value = "";
  document.getElementById("taskDate").value = "";
  document.getElementById("taskTime").value = "";
}

document.getElementById("clear").onclick = clearAllTasks;

function clearAllTasks() {
  localStorage.removeItem("tasks");
  tasks = [];
  renderTasks();
}

function clearTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function renderTasks() {
  const board = document.getElementById("taskBoard");
  board.innerHTML = "";

  if (tasks.length === 0) {
    board.innerHTML = `
      <div class="empty-state">
        <p>No tasks. Add a new task!</p>
      </div>
    `;
    return;
  }

  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    board.innerHTML += `
      <div class="task fade-in">
        <button onclick="clearTask(${i})" class="delete-btn">✖</button>
        <div class="task-text">
          ${task.description}
        </div>
        <div class="task-time">
          ${task.date}<br>${task.time}
        </div>
      </div>
    `;
  }
}