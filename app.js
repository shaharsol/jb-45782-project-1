
const NOTE_KEY_NAME = 'notes'
let animate = true;

function addNote(event) {
    event.preventDefault();
    const data = collectDataFromForm();
    const notesJSON = localStorage.getItem(NOTE_KEY_NAME);
    const noteId = notesJSON ? JSON.parse(notesJSON).length : 0;
    const newNote = generateNote(data, noteId, animate);
    injectNoteToDOM(newNote);
    saveNoteToLocalStorage(data);
    clearForm();
}



function collectDataFromForm() {
    const textDescription = document.getElementById("taskDescription").value;
    const submissionDate = document.getElementById("submissionDate").value;
    const submissionTime = document.getElementById("submissionTime").value;

    return {
        textDescription,
        submissionDate,
        submissionTime,
    };
}

function generateNote(data, id, animation = true) {

    // const noteJSON = localStorage.getItem(NOTE_KEY_NAME) || "[]";
    const { textDescription, submissionDate, submissionTime } = data;
    // const notes = JSON.parse(noteJSON);
    // let id = notes.length;
    // console.log(` generate id${id}`)

    const newNote =
        `<div id='${id}' class= "${animation ? "fadeIn note" : "note"}"  style="background-image: url(images/notebg.png);">
            <button class="deleteButton" onclick="deleteNote(${id})"><span class="glyphicon glyphicon-remove"></span> </button>
            <p id=text>${textDescription}</p>
            <p id=date>${submissionDate}</p>
            <p id=time>${submissionTime}</p>
        
            
        </div>`

    return newNote;
}




function injectNoteToDOM(newNote) {
    document.getElementById("noteContainer").innerHTML += newNote;
}



function loadNotesFromStorage() {
    document.getElementById("noteContainer").innerHTML = "";
    const notesJSON = localStorage.getItem(NOTE_KEY_NAME);
    if (notesJSON) {
        const notes = JSON.parse(notesJSON);
        for (let i = 0; i < notes.length; i++) {
            const newNote = generateNote(notes[i], i,false);
            injectNoteToDOM(newNote);
        }
    }
}

function saveNoteToLocalStorage(note) {
    const noteJSON = localStorage.getItem(NOTE_KEY_NAME) || "[]";
    const notes = JSON.parse(noteJSON);
    notes.push(note);
    localStorage.setItem(NOTE_KEY_NAME, JSON.stringify(notes));
}

function clearForm() {
    document.getElementById("taskForm").reset();
}



function deleteNote(id) {
    const notesJSON = localStorage.getItem(NOTE_KEY_NAME);
    const notes = JSON.parse(notesJSON);
    notes.splice(id, 1);
    localStorage.setItem(NOTE_KEY_NAME, JSON.stringify(notes));
    loadNotesFromStorage();
}

loadNotesFromStorage()