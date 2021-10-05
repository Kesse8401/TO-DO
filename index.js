
const addButton = document.getElementById("mainButton");
const userInput = document.getElementById("userInput");
const theListUL = document.getElementById("theList");
const buttonDeletingDoneTasks = document.getElementById('remover');

// When user press the button function buttonCheck() gets called
userInput.addEventListener('keydown', () => {
    buttonCheck();
})

//Function checks if user input field is empty. If it is addButton gets disabled.
const buttonCheck = () => {
    if (userInput.value === "") {
        addButton.disabled = true;
    } else {
        addButton.disabled = false;
    }
}
buttonCheck();

//Function creates and adds a DOM node (li)
const createListElement = (label = userInput.value) => {
    let li = document.createElement("li"); // create "li"
    li.appendChild(document.createTextNode(label)); //makes text from input field the li text
    theListUL.appendChild(li); //adds li to ul
    userInput.value = ''
    createCheckbox(li);
    buttonCheck();
    return li
}
//function that handles event.target (aka list item)more specificaly adds or remove strike class to event.target
const checkboxHandler = (listElement) => (event) => { 
    console.log(event.target)
    if (event.target.checked === true) {
        listElement.classList.add('strike');
    } else {
        listElement.classList.remove('strike');
    }

}

// Function that creates and adds checkbox to each element of the list
const createCheckbox = (listElement) => {
    let addCheckbox = document.createElement('input');
    addCheckbox.type = 'checkbox';
    addCheckbox.classList.add('doneCheckbox');
    listElement.appendChild(addCheckbox);

    addCheckbox.addEventListener('change', checkboxHandler(listElement));
}

// This function removes all crossed tasks (isCrossed) after pressing button
const taskRemover = () => {
    let allAddedTasks = document.querySelectorAll("#theList > li");

    for (let i = 0; i < allAddedTasks.length; i++) {
        const indChild = allAddedTasks[i];
        const isCrossed = indChild.classList.contains('strike')
        if (isCrossed === true) {
            theListUL.removeChild(indChild);
        }
    }
    buttonCheck();
}

const file = 'https://jsonplaceholder.typicode.com/todos'

//fetching json file
fetch(file)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        appendData(data);
    })
    .catch(function (err) {
        console.log(err);
    });

// function that creates list element (title of each item) and appends it
function appendData(data) {
    for (var i = 0; i < data.length; i++) {
        const item = data[i];
        const elementLi = createListElement(item.title);

        if (item.completed) {
            elementLi.classList.add('strike');
        }
    }
}
// Hello, this is secondBranch change