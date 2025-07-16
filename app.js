const TASKS_KEY_NAME = 'Tasks'

function addTask(event) {
    event.preventDefault();
    const Text_Area = document.getElementById('Text_Area').value;
    // I am using camel-case naming in order to match their HTML ID names for convenient purposes 
    const D_o_D = document.getElementById('D_o_D').value;
    const T_o_D = document.getElementById('T_o_D').value;
    // D_o_D stands for Date of Destination
    // T_o_D stands for Time of Destination
    // The reason to do so - I don't want to clash IDs with the HTML encompassing div sections of the corresponding inputs 
    const oneObject = objectify(Text_Area, D_o_D, T_o_D);
    const JSONString = localStorage.getItem(TASKS_KEY_NAME);
    const parsedJSON = JSON.parse(JSONString)
    const ID = JSONString ? parsedJSON.length : 0;
    const save_status = "One_Note"
    const newInjection = generatedInjection(oneObject, ID, save_status);
    inject(newInjection);
    save(oneObject);
    clearForm();
};

function objectify(Text_Area, D_o_D, T_o_D) {
    const myObject = {
        Text_Area,
        D_o_D,
        T_o_D,
    }
    return myObject
};

function generatedInjection(object, ID, status) {
    const { Text_Area, D_o_D, T_o_D } = object;
    const newInjection = `
    <div class = ${status}>
        <div class = "One_Note_Text_Area">
            <textarea>${Text_Area}</textarea>
        </div>
        <div class = "One_Note_D_o_D">
            <p>${D_o_D}</p>
        </div>
        <div class = "One_Note_T_o_D">
            <p>${T_o_D}</p>
        </div>
        <div class = "One_Note_Deletion">
            <button onclick="deletion(${ID})">X</button>
        </div>
    </div>
    `;

    return newInjection
};

function inject(injection) {
    document.getElementById("Tasks_Container").innerHTML += injection;
};

function save(object) {
    const JSONString = localStorage.getItem(TASKS_KEY_NAME) || '[]';
    const parsedString = JSON.parse(JSONString);
    parsedString.push(object);
    const parsedJSON = JSON.stringify(parsedString)
    localStorage.setItem(TASKS_KEY_NAME, parsedJSON);
};

function clearForm() {
    document.getElementById('forma').reset();
};

function load() {
    document.getElementById("Tasks_Container").innerHTML = "";
    let stringigantic = "";
    const firstArray = localStorage.getItem(TASKS_KEY_NAME);
    const arrayParsed = JSON.parse(firstArray);
    const load_status = "One_Note_Load"
    let i = 0;
    for (const object of arrayParsed) {
        const newInjection = generatedInjection(object, i, load_status);
        i++;
        stringigantic += newInjection
    };
    inject(stringigantic);
};

load();

function deletion(ID) {
    const JSONString = localStorage.getItem(TASKS_KEY_NAME)
    const parsedString = JSON.parse(JSONString);
    parsedString.splice(ID, 1);
    const parsedJSON = JSON.stringify(parsedString)
    localStorage.setItem(TASKS_KEY_NAME, parsedJSON);
    load();
};






