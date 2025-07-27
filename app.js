const NOTES_KEY = "notes"
function addTask(event) {
    event.preventDefault();
    const data = collectDataFromForm();
    data.id = Date.now()
    const newNote = generateNote(data);
    
    injectTRToDOM(newNote);
    clearForm();
    saveToLocalStorage(data);
}
function collectDataFromForm() {
    const task = document.getElementById('task').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    return {
        task,
        date,
        time
    }
}
function generateNote(data) {
    
    const {id, task, date, time } = data;

    const newNote = `
        <div class="note">
                <img src="/projects/notebg.png" alt="">
                
                <div class="note-content" data-id="${id}">
                    <button onclick=deleteTask(this) class="note-delete">✘</button>
                    <p>${task}</p>
                    <div class="note-datetime">
                    <time datetime="${date}">${date}</time>
                    <br>
                    <time datetime="${time}">${time}</time>
                    </div>
                
                </div>
            </div>
    `
    return newNote;
}
function injectTRToDOM(newNote) {
    document.getElementById('notes').innerHTML += newNote;
}
function clearForm() {
    document.getElementById('taskForm').reset()
}

function loadFromStorage() {
    const notesJSON = localStorage.getItem(NOTES_KEY);
    if (notesJSON) {
        const notes = JSON.parse(notesJSON);
        for (const note of notes) {
            const newNote = generateNote(note);
            injectTRToDOM(newNote);
        }
    }
}


function saveToLocalStorage(data) {
    const notesJSON = localStorage.getItem(NOTES_KEY) || "[]";
    const notes = JSON.parse(notesJSON);
    notes.push(data);
    localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
}

function deleteTask(button) {
    const note = button.closest('.note');
    const noteContent = note.querySelector('.note-content');
    const noteId = Number(noteContent.dataset.id);
    note.remove()
    const notesJSON = localStorage.getItem("notes") || "[]";
  const notes = JSON.parse(notesJSON);
  const updatedNotes = notes.filter(note => note.id !== noteId);
  localStorage.setItem("notes", JSON.stringify(updatedNotes));
}
loadFromStorage();
