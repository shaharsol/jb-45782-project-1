function addNote(event){
    event.preventDefault();
    const data = collectUserData();
    const noteJSON = localStorage.getItem("notes");
    const notes = noteJSON ? JSON.parse(noteJSON) : [];
    const noteId = notes.length ; 
    
    const newitem = createNote(data, noteId); 
    injectToDom(newitem, true); 
    
    saveNoteToLocalStorage(data); 
    event.target.reset();
}

function collectUserData(){
    const details = document.getElementById("task-details").value;
    const date = document.getElementById("task-date").value;
    const time = document.getElementById("task-time").value;
    return{
        details,
        date,
        time,
    };
}

function createNote(data, id){
    const {details, date, time} = data;
    return `
    <div class="note" id="note-${id}">
        <div class="text-info">
            note no. ${id+1} 
            <span class="cross-mark">
                <a href="#" onclick="deleteNote(${id})">&cross;</a>
            </span>
            <br><br>${details}
        </div>
        <div class="timedate">${date}<br> ${time}</div>
    </div>
    `;
}

function injectToDom(newitem, isNew = false){ 
    const addhere = document.getElementById("main");
    
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = newitem;
    const noteElement = tempDiv.firstElementChild; 

    if (isNew) {
        noteElement.classList.add('fadein');
        noteElement.addEventListener('animationend', () => {
            noteElement.classList.remove('fadein');
        }, { once: true }); 
    }

    addhere.appendChild(noteElement); 
}

function saveNoteToLocalStorage(note){
    const noteJSON = localStorage.getItem("notes") || "[]";
    const notes = JSON.parse(noteJSON);
    notes.push(note);
    localStorage.setItem("notes", JSON.stringify(notes));
}

function loadNotesFromStorage(){
    const mainElement = document.getElementById("main");
    mainElement.innerHTML = ""; 

    const noteJSON = localStorage.getItem("notes");
    if (noteJSON){
        const notes = JSON.parse(noteJSON);
        let i = 0;
        for(const note of notes){ 
            const currentNoteHtml = createNote(note, i);
            injectToDom(currentNoteHtml, false); 
            i++;
        }
    }    
}

function deleteNote(id){
    const noteJSON = localStorage.getItem("notes");
    const notes = JSON.parse(noteJSON);
    
    notes.splice(id, 1); 
    
    localStorage.setItem("notes", JSON.stringify(notes));
    loadNotesFromStorage();
}

loadNotesFromStorage();