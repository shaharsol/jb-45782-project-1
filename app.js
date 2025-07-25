function addNoteToBoard(event) {
    event.preventDefault()
    const data = takeDataFromForm()
    const noteId = (JSON.parse(localStorage.getItem("notes")) || []).length
    const newNote = createNewNote(data, noteId, true)
    injectNewNoteToDOM(newNote)
    saveNoteToLocalStorage(data)
    resetForm()
}

function takeDataFromForm() {
    const textTask = document.getElementById("textTask").value
    const dateTask = document.getElementById("dateTask").value
    const timeTask = document.getElementById("timeTask").value

    return {
        textTask,
        dateTask,
        timeTask
    }
}

function createNewNote(data, noteId, withAnimation = false) {
    const { textTask, dateTask, timeTask } = data

    const note = document.createElement("div")
    note.className = "note"
    if (withAnimation) note.classList.add("fade-in")
    note.innerHTML = `
        <div class="note-content">
            <button type="button" class="btn-close" aria-label="Close" onclick="deleteNote(${noteId})">
                <i class="bi bi-x-lg"></i>
            </button>
            <p class="task-text">${textTask}</p>
            <div class="date-time">
                <p class="date">${dateTask}</p>
                <p class="time">${timeTask}</p>
            </div>
        </div>
    `
    return note
}

function injectNewNoteToDOM(newNote) {
    document.getElementById("noteBoard").appendChild(newNote)
}

function saveNoteToLocalStorage(data) {
    const notes = JSON.parse(localStorage.getItem("notes")) || []
    notes.push(data)
    localStorage.setItem("notes", JSON.stringify(notes))
}

function loadNotesFromLocalStorage() {
    const JSONnotes = localStorage.getItem("notes")
    if (JSONnotes) {
        const codeNotes = JSON.parse(JSONnotes)
        let noteId = 0;
        const fragment = document.createDocumentFragment()
        for (const note of codeNotes) {
            const newNote = createNewNote(note, noteId, false)
            fragment.appendChild(newNote)
            noteId++;
        }
        document.getElementById("noteBoard").appendChild(fragment)
    }
}

loadNotesFromLocalStorage()

function deleteNote(noteId) {
    const notes = JSON.parse(localStorage.getItem("notes"))
    notes.splice(noteId, 1);
    localStorage.setItem("notes", JSON.stringify(notes))
    document.getElementById("noteBoard").innerHTML = ""
    loadNotesFromLocalStorage()
}

function clearBoard() {
    document.getElementById("noteBoard").innerHTML = ""
    localStorage.removeItem("notes")  
}

function resetForm() {
    document.getElementById("form").reset()
}