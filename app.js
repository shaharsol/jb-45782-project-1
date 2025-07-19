function addNote(event){
    event.preventDefault();
    const data = collectUserData()
    const noteJSON = localStorage.getItem("notes");
    const noteId = noteJSON? JSON.parse(noteJSON).length: 0;
    const newitem = createNote(data, noteId);
    injectToDom(newitem); 
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
    const newitem = `
    <div class="note" id="note">
        <div class="text-info">
            note no. ${id} 
            <span class="cross-mark">
                <a href="#" onclick="deleteNote(${id})">&cross;</a>
            </span>
            <br><br>${details}
        </div>
        <div class="timedate">${date}<br> ${time}</div>
    </div>
    `;
    return newitem;
}
function injectToDom(newitem){
    const addhere = document.getElementById("main");
    addhere.innerHTML += newitem ; 
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
        let allNotesHtml = '';
        let i = 0;
        for(const note of notes){
            const currentNoteHtml = createNote(note, i);
            allNotesHtml += currentNoteHtml;
            i++;
        }
        mainElement.innerHTML = allNotesHtml; 
    }    
}
function deleteNote(id){
    const noteJSON = localStorage.getItem("notes");
    const notes = JSON.parse(noteJSON);
    notes.splice(id, 1);
    localStorage.setItem("notes", JSON.stringify(notes))
    loadNotesFromStorage();
}

function fadeIn(){
    let dog = document.getElementById('ola');
    dog.classList.toggle("olafade")
}
loadNotesFromStorage();