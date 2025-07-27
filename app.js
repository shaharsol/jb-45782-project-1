const NOTE_KEY_NAME = "notes";



function addNote(event) {
    event.preventDefault();
    const data = collectDataFromForm();
    const newDiv = generateDiv(data);
    injectDivToDOM(newDiv);
    saveMissionToLocalStorage(data);
}

function collectDataFromForm() {
    const mission = document.getElementById('mission').value
    const date = document.getElementById('date').value
    const time = document.getElementById('time').value
    return {
        mission,
        date,
        time
    };
}


function generateDiv(data, index) {
    const newDiv = `
            <div class="item">
                <div>${data.mission}</div>
                <div>date: ${data.date}</div>
                <div>time: ${data.time}</div>
                <div class="delete-btn" onclick="handleRemoveWithFade(this, ${index})">X</div>
            </div>
     `;
    return newDiv;
}



function injectDivToDOM(newDivString) {
    const container = document.getElementById('mission-list');
    const temp = document.createElement('div');
    temp.innerHTML = newDivString;
    const newElement = temp.firstElementChild;
    newElement.style.opacity = '0';
    newElement.style.transition = 'opacity 0.5s ease';
    container.appendChild(newElement);
    requestAnimationFrame(() => {
        newElement.style.opacity = '1';
    });
}

function loadMissionFromStorage() {
    const notesJSON = localStorage.getItem(NOTE_KEY_NAME);
    if (notesJSON) {
        const notes = JSON.parse(notesJSON);
        for (let i = 0; i < notes.length; i++) {
            const newDiv = generateDiv(notes[i], i);
            injectDivToDOM(newDiv);
        }
    }
}

function saveMissionToLocalStorage(note) {
    const notesJSON = localStorage.getItem(NOTE_KEY_NAME) || "[]";
    const notes = JSON.parse(notesJSON);
    notes.push(note);
    localStorage.setItem(NOTE_KEY_NAME, JSON.stringify(notes))
}

function clearForm() {
    document.getElementById('note-form').reset();
}

let removeItem = function(index){
    const notesJSON = localStorage.getItem(NOTE_KEY_NAME) || "[]";
    const notes = JSON.parse(notesJSON);
    notes.splice(index, 1);
    localStorage.setItem(NOTE_KEY_NAME, JSON.stringify(notes));
    document.getElementById('mission-list').innerHTML = '';
    loadMissionFromStorage();
}

document.addEventListener('DOMContentLoaded', () => {
    loadMissionFromStorage();
});

function clearForm() {
    document.getElementById("my-form").reset();
}

function handleRemoveWithFade(element, index) {
    const item = element.closest(".item");
    item.style.removeProperty("opacity");
    item.style.removeProperty("transition");
    item.classList.add("fade-out");
    setTimeout(() => {
        removeItem(index);
    }, 500);
}

//date and time restrictions :)

document.addEventListener('DOMContentLoaded', () => {
    const dateInput = document.getElementById('date');
    const timeInput = document.getElementById('time');
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
    dateInput.addEventListener('change', () => {
        const selectedDate = dateInput.value;
        const now = new Date();
        if (selectedDate === today) {
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const currentTime = `${hours}:${minutes}`;
            timeInput.setAttribute('min', currentTime);
        } else {
            timeInput.removeAttribute('min');
        }
    });
});