let newTaskInput = document.querySelector('#new-task');
let addTaskBtn = document.querySelector('#addTaskBtn');
let incompleteTaskContainer = document.querySelector('#incomplete-tasks');
let toDoContainer = document.querySelector('#incomplete-tasks');
let completedContainer = document.querySelector('#completed-tasks');
let editCompletedTasksContainer = document.querySelector('#completed-tasks');
let uncheckTasksContainer = document.querySelector('#completed-tasks');
let edit = document.querySelector('.edit');
let deleteInCompletedTasksSection = document.querySelector('#completed-tasks');

//This grabs the Incomplete tasks from local storage and pushes into the storageArray
let incompleteTasksStorage = JSON.parse(localStorage.getItem('Incomplete'));
let storageArray = [];
if(incompleteTasksStorage !== null){
    incompleteTasksStorage.forEach(function(el){
        storageArray.push(el);
    })
}

//This grabs the Completed tasks and pushes onto the storageArrayCompleted array.
let completedTasksStorage = JSON.parse(localStorage.getItem('Completed'));
let storageArrayCompleted = [];
if(completedTasksStorage !== null){
    completedTasksStorage.forEach(function(el){
        storageArrayCompleted.push(el);
    })
}

//Event listeners for the various functions below
addTaskBtn.addEventListener('click', addTask);
newTaskInput.addEventListener('keyup', function(e){
    if(e.keyCode == 13){
        addTask();
    }
});
toDoContainer.addEventListener('click', deleteToDoTask);
completedContainer.addEventListener('click', deleteCompletedTask);
toDoContainer.addEventListener('click', checkOffTask);
uncheckTasksContainer.addEventListener('click', uncheckTasks);
toDoContainer.addEventListener('click', editTask);
deleteInCompletedTasksSection.addEventListener('click', deleteCompletedTask);
editCompletedTasksContainer.addEventListener('click', editCompletedTask);


//This function builds the list item elements for the task once it's created
var createTaskElement = function(getLabelValue){
    let listItem = document.createElement('li');
    let checkBox = document.createElement('input');
    let textBox = document.createElement('input');
    let editBtn = document.createElement('button');
    let deleteBtn = document.createElement('button');
    let label = document.createElement('label');
    
    label.innerText = getLabelValue;

    checkBox.type = 'checkbox';
    textBox.type = 'text'

    editBtn.innerText = 'Edit';
    editBtn.className = 'edit';
    deleteBtn.innerText = 'Delete';
    deleteBtn.className = 'delete';

    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(textBox);
    listItem.appendChild(editBtn);
    listItem.appendChild(deleteBtn);

    return listItem;
}

//Calls addTaskOnPageLoad() & addCompletedTaskOnPageLoad(), grabs the local storage data and paints the DOM
document.addEventListener( "DOMContentLoaded", function(){
    addTaskOnPageLoad();
    addCompletedTaskOnPageLoad();
    //Checks the completed checkboxes to true
    var editCompletedTasksCheckBox = document.querySelectorAll('#completed-tasks li input[type="checkbox"]');
    editCompletedTasksCheckBox.forEach((element) =>{
        element.checked = true;
    });
})

//Adds ToDo tasks in the array on page load 
function addTaskOnPageLoad(){
    let storedIncompleteTasks = storageArray;

    storedIncompleteTasks.forEach(function(element) {
        var newElOne = createTaskElement(element);
        incompleteTaskContainer.appendChild(newElOne);     
    });
}

//Adds Completed tasks in the COMPLETED section on page load
function addCompletedTaskOnPageLoad(){
    var completedTasksContainer = document.querySelector('#completed-tasks');
    
    storageArrayCompleted.forEach(function(e) {
        let ctEl = createTaskElement(e);
        completedTasksContainer.appendChild(ctEl);
    })

}

//Adds a new task from the input and adds to localstorage
function addTask(){
    if(newTaskInput.value !== ''){       
        
        storageArray.push(newTaskInput.value);
        localStorage.setItem('Incomplete', JSON.stringify(storageArray));

        var newEl = createTaskElement(newTaskInput.value);
        incompleteTaskContainer.appendChild(newEl);
        newTaskInput.value = '';
    }
};

//Deletes a task from the list and removes from Local Storage
function deleteToDoTask(e){
    if(e.target.className == 'delete'){

        let heyYou = confirm('Hey pal, you sure you want to trash this thing?');
        
        if(heyYou == true){

            let pos = e.target.parentNode;
            let getLabelText = pos.querySelector('label').innerText;
            let labelTextIndex = storageArray.indexOf(getLabelText);
    
            storageArray.splice(labelTextIndex, 1);
            localStorage.setItem('Incomplete', JSON.stringify(storageArray));
    
            e.target.parentNode.remove();
            
        } else {

            return;           
        }
    }
}

//Deletes completed tasks from the COMPLETED section
function deleteCompletedTask(e){
    if(e.target.className == 'delete'){

        let heyYou = confirm('Hey pal, you sure you want to trash this thing?');
        
        if(heyYou == true){

            let pos = e.target.parentNode;
            let getLabelText = pos.querySelector('label').innerText;
            let labelTextIndex = storageArrayCompleted.indexOf(getLabelText);
            
            storageArrayCompleted.splice(labelTextIndex, 1);
            localStorage.setItem('Completed', JSON.stringify(storageArrayCompleted));
            
            e.target.parentNode.remove();
            
        } else {

            return;           
        }
    }
}

//Checks off task and moves it to COMPLETED section
function checkOffTask(e){
    if(e.target.type == 'checkbox'){
        //Checks off element and transfers to completed
        let innerVal = e.target.nextElementSibling.innerText;
        let newCompletedTask = createTaskElement(newTaskInput.value);
        completedContainer.appendChild(newCompletedTask);
        e.target.parentNode.remove();
        let lastLi = document.querySelector('#completed-tasks li:last-child label');
        lastLi.innerHTML = innerVal;
        let lastCheckBox = document.querySelector('#completed-tasks li:last-child input[type="checkbox"]');
        lastCheckBox.checked = 'true';

        //Get's the index of the position of the array
        let pos = e.target.parentNode;
        let getLabelText = pos.querySelector('label').innerText;
        let labelTextIndex = storageArray.indexOf(getLabelText);
        
        //Pushes previous value from storrageArray and pushes onto storrageArrayCompleted array
        storageArrayCompleted.push(getLabelText);
        localStorage.setItem('Completed', JSON.stringify(storageArrayCompleted));
        
        //Removes the element from the array and resets the local storage. 
        storageArray.splice(labelTextIndex, 1);
        localStorage.setItem('Incomplete', JSON.stringify(storageArray));
    }
}

//Unchecks task and moves it back to the TODO section
function uncheckTasks(e){

    if(e.target.type == 'checkbox'){
        let innerValue = e.target.nextElementSibling.innerText;
        let newCompletedTask = createTaskElement(newTaskInput.value);
        incompleteTaskContainer.appendChild(newCompletedTask);
        e.target.parentNode.remove();
        let lastLi = document.querySelector('#incomplete-tasks li:last-child label');
        lastLi.innerHTML = innerValue;
    
        let pos = e.target.parentNode;
        let getLabelText = pos.querySelector('label').innerText;
        let labelTextIndex = storageArrayCompleted.indexOf(getLabelText);
    
        //Pushes previous value from storrageArray and pushes onto storrageArrayCompleted array
        storageArray.push(getLabelText);
        localStorage.setItem('Incomplete', JSON.stringify(storageArray));
    
        //Removes the element from the array and resets the local storage. 
        storageArrayCompleted.splice(labelTextIndex, 1);
        localStorage.setItem('Completed', JSON.stringify(storageArrayCompleted));                
    }
}

//Edit's the task and updates local storage
function editTask(e) {
    
    if(e.target.className == 'edit'){

        let listItem = e.target.parentNode        
        let editInput = listItem.querySelector("input[type=text]");
        let label = listItem.querySelector("label");        
        let containsClass = listItem.classList.contains("editMode");
        var prev = storageArray.indexOf(label.innerText);
        
        if (containsClass) {

            label.innerText = editInput.value;            
            storageArray.splice(prev, 1, editInput.value);
            localStorage.setItem('Incomplete', JSON.stringify(storageArray));

        } else {

            editInput.value = label.innerText;

        }

        listItem.classList.toggle("editMode");
    }
}

//Edits the tasks in Completed section
function editCompletedTask(e) {
    
    if(e.target.className == 'edit'){

        let listItem = e.target.parentNode        
        let editInput = listItem.querySelector("input[type=text]");
        let label = listItem.querySelector("label");        
        let containsClass = listItem.classList.contains("editMode");
        var prev = storageArrayCompleted.indexOf(label.innerText);
        
        if (containsClass) {

            label.innerText = editInput.value;            
            storageArrayCompleted.splice(prev, 1, editInput.value);
            localStorage.setItem('Completed', JSON.stringify(storageArrayCompleted));

        } else {

            editInput.value = label.innerText;

        }

        listItem.classList.toggle("editMode");
    }
}


