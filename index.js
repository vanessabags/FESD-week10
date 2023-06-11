class Roommate {
    constructor (id, name) {
        this.id = id;
        this.name = name;
        this.chores = [];
    }
    addChore (chore) {
        this.chores.push(chore);
    }
    deleteChore (chore) {
        let index = this.chores.indexOf(chore);
        this.chores.splice(index, 1);
    }
}
class Chore {
    constructor (task, dateStart, dateEnd) {
        this.task = task;
        this.dateStart = dateStart;
        this.dateEnd = dateEnd;
    }
}
let roommates = [];
let roommateId = 0;

onClick("add", () => {
    roommates.push(new Roommate(roommateId++, getValue("new-roommate")));
    drawDOM();
    document.getElementById("new-roommate").value = " "
});

function onClick(id, action) {
    let element = document.getElementById(id);
    element.addEventListener("click", action);
    return element;
}

function getValue(id) {
    return document.getElementById(id).value;
}

function drawDOM() {
    let roommateDiv = document.getElementById("roommates");
    clearElement(roommateDiv);
    for (roommate of roommates) {
        let table = createRoommateTable(roommate);
        let title = document.createElement("h3");
        title.innerHTML = roommate.name + " "; 
        title.appendChild(createDeleteRoommateButton(roommate));
        roommateDiv.appendChild(title);
        roommateDiv.appendChild(table);
        for (chore of roommate.chores) {
            createChoreRow(roommate, table, chore);
        }
    }
}

function createChoreRow(roommate, table, chore) {
    let row = table.insertRow(2);
    row.insertCell(0).appendChild(createCheckBox());
    row.insertCell(1).innerHTML = chore.task;
    row.insertCell(2).innerHTML = chore.dateStart;
    row.insertCell(3).innerHTML = chore.dateEnd;
    row.insertCell(4).appendChild(createDeleteRowButton(roommate, chore))
;}

function createDeleteRowButton (roommate, chore) {
    let btn = document.createElement("button");
    btn.className = "btn btn-outline-danger";
    btn.innerHTML = "Delete";
    btn.onclick = () => {
        let index = roommate.chores.indexOf(chore);
        roommate.chores.splice(index, 1);
        drawDOM();
    };
    return btn;
}

function createCheckBox() {
    let box = document.createElement("input");
    box.setAttribute("type", "checkbox");
    return box;
}

function createDeleteRoommateButton(roommate) {
    let btn = document.createElement("button");
    btn.className = "btn btn-danger btn-sm";
    btn.innerHTML = "Delete Roommate";
    btn.onclick = () => {
        let index = roommates.indexOf(roommate);
        roommates.splice(index, 1);
        drawDOM();
    };
    return btn;
}

function addChoreButton(roommates) {
    let btn = document.createElement("button");
    btn.className = "btn btn-outline-dark";
    btn.innerHTML = "Add Chore";
    btn.onclick = () => {
        roommates.chores.push(new Chore(
            getValue(`task-input-${roommates.id}`), 
            getValue(`date-start-input-${roommates.id}`), 
            getValue(`date-end-input-${roommates.id}`)));
        drawDOM();
    }
    return btn;
}

function createRoommateTable(roommates) {
    let table = document.createElement("table");
    table.setAttribute("class", "table table-info table-striped");
    let row = table.insertRow(0);
    let checkbox = document.createElement("th");
    let taskColumn = document.createElement("th");
    let dateStartColumn = document.createElement("th");
    let dateEndColumn = document.createElement("th");
    taskColumn.innerHTML = "Task";
    dateStartColumn.innerHTML = "Date Start";
    dateEndColumn.innerHTML = "Date End";
    row.appendChild(checkbox);
    row.appendChild(taskColumn);
    row.appendChild(dateStartColumn);
    row.appendChild(dateEndColumn);
    let formRow = table.insertRow(1);
    let checkboxTh = document.createElement("th");
    let taskTh = document.createElement("th");
    let dateStartTh = document.createElement("th");
    let dateEndTh = document.createElement("th");
    let createTh = document.createElement("th");
    let taskInput = document.createElement("input");
    taskInput.setAttribute("id", `task-input-${roommates.id}`);
    taskInput.setAttribute("type", "text");
    taskInput.setAttribute("class", "form-control");
    let dateStartInput = document.createElement("input");
    dateStartInput.setAttribute("id", `date-start-input-${roommates.id}`);
    dateStartInput.setAttribute("type", "date");
    dateStartInput.setAttribute("class", "form-control");
    let dateEndInput = document.createElement("input");
    dateEndInput.setAttribute("id", `date-end-input-${roommates.id}`);
    dateEndInput.setAttribute("type", "date");
    dateEndInput.setAttribute("class", "form-control");
    let newCheckBox = createCheckBox();
    let newChoreButton = addChoreButton(roommates);
    checkboxTh.appendChild(newCheckBox);
    taskTh.appendChild(taskInput);
    dateStartTh.appendChild(dateStartInput);
    dateEndTh.appendChild(dateEndInput);
    createTh.appendChild(newChoreButton);
    formRow.appendChild(checkboxTh);
    formRow.appendChild(taskTh);
    formRow.appendChild(dateStartTh);
    formRow.appendChild(dateEndTh);
    formRow.appendChild(createTh);
    return table;
}

function clearElement(element) {
    while(element.firstChild) {
        element.removeChild(element.firstChild);
    }
}