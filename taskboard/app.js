document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("taskForm");
    const taskList = document.getElementById("taskList");
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    const renderTasks = () => {
        taskList.innerHTML = "";
        tasks.forEach(task => addTaskToDOM(task));
    };

    const addTaskToDOM = ({id, desc, date, time}) => {
        const div = document.createElement("div");
        div.className = "task";
        div.innerHTML = `
            <span class="pin"></span>
            <span class="delete-btn">&times;</span>
            <p>${desc}</p>
            <div class="date-time">${date} | ${time}</div>
        `;
        taskList.appendChild(div);

        div.querySelector(".delete-btn").onclick = () => deleteTask(id);
    };

    form.onsubmit = e => {
        e.preventDefault();
        const newTask = {
            id: Date.now(),
            desc: form.desc.value,
            date: form.date.value,
            time: form.time.value
        };

        tasks.push(newTask);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        addTaskToDOM(newTask);
        form.reset();
    };

    const deleteTask = id => {
        tasks = tasks.filter(task => task.id !== id);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTasks();
    };

    document.getElementById("clearAll").onclick = function() {
        if (confirm("למחוק את כל המשימות?")) {
            localStorage.removeItem("tasks");
            tasks = [];
            renderTasks();
        }
    };

    renderTasks();
});
