const NOTES_KEY_NAME = "notes";

function addNote(event) {
  event.preventDefault(); // prevent form submission
  const data = collectDataFromForm();
  const notesJSON = localStorage.getItem(NOTES_KEY_NAME);
  const noteId = notesJSON ? JSON.parse(notesJSON).length : 0;
  const newDIV = generateDIV(data, noteId);
  injectDIVToDOM(newDIV);
  saveNoteToLocalStorage(data);
  clearForm();
  setTimeout(() => {
  document.getElementById(noteId).className = `note`;
}, 1000)
}

function collectDataFromForm() {
  const text = document.getElementById("task-content").value;
  const date = document.getElementById("task-date").value;
  const time = document.getElementById("task-time").value;

  return {
    text,
    date,
    time,
  };
}

function generateDIV(data, id) {
  // deconstruction
  const { text, date, time } = data;

  const newDIV = `
    <div class="note fade-in" id="${id}">
        <div class="text">${text}</div>
        <div class="date-and-time">
        <span class="date">${date}</span>
        <span class="time">${time}</span>
        </div>
        <div class="close-btn"><button type="button" class="btn-close" aria-label="Close" onclick="deleteNote(${id})"></button></div>
    </div>
    `;
  return newDIV;
}

function generateDIVWithoutAnimation(data, id) {
  // deconstruction
  const { text, date, time } = data;

  const newDIV = `
    <div class="note" id="${id}">
        <div class="text">${text}</div>
        <div class="date-and-time">
        <span class="date">${date}</span>
        <span class="time">${time}</span>
        </div>
        <div class="close-btn"><button type="button" class="btn-close" aria-label="Close" onclick="deleteNote(${id})"></button></div>
    </div>
    `;
  return newDIV;
}

function injectDIVToDOM(newDIV) {
  document.getElementById("notes-container").innerHTML += newDIV;
}

function loadNotesFromStorage() {
  document.getElementById("notes-container").innerHTML = "";
  const notesJSON = localStorage.getItem(NOTES_KEY_NAME);
  if (notesJSON) {
    const notes = JSON.parse(notesJSON);
    let i = 0;
    for (const note of notes) {
      const newDIV = generateDIVWithoutAnimation(note, i);
      i++;
      injectDIVToDOM(newDIV);
    }
  }
}

function saveNoteToLocalStorage(note) {
  const notesJSON = localStorage.getItem(NOTES_KEY_NAME) || "[]";
  const notes = JSON.parse(notesJSON);
  notes.push(note);
  localStorage.setItem(NOTES_KEY_NAME, JSON.stringify(notes));
}

function clearForm() {
  document.getElementById("note-form").reset();
}

function deleteNote(id) {
  const notesJSON = localStorage.getItem(NOTES_KEY_NAME);
  const notes = JSON.parse(notesJSON);
  notes.splice(id, 1);
  localStorage.setItem(NOTES_KEY_NAME, JSON.stringify(notes));
  loadNotesFromStorage();
}

const deleteAllNote = () => {
  const notesJSON = localStorage.getItem(NOTES_KEY_NAME);
  let notes = JSON.parse(notesJSON);
  notes = [];
  localStorage.setItem(NOTES_KEY_NAME, JSON.stringify(notes));
  loadNotesFromStorage();
}

loadNotesFromStorage();

