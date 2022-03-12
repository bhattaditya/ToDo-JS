const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const taskItems = document.querySelector(".task-items");

//on page refresh loads data from local storage
showTasks();

inputBox.addEventListener("keyup", function(e) {
    if (e.code === 'Enter') {
        if (inputBox.value.trim().length == 0) {
            alert ("Please enter a task!");
        } 
    }
});

//  on click event - user input will be saved in browser local storage 
addBtn.onclick = () => {
    let userData = inputBox.value;
    console.log(userData.trim().length);
    if (userData.trim().length == 0) {
        alert("Please enter task!");
    } else {
        let getLocalStorage = localStorage.getItem("New Todo");
        if (getLocalStorage == null) {
            arr = [];
        } else {
            arr = JSON.parse(getLocalStorage);
        }
        arr.push(userData);
        localStorage.setItem("New Todo", JSON.stringify(arr));
        showTasks();
    }
}

// will fetch records from local storage and add them as inside ul as li tags
function showTasks() {
    let getLocalStorage = localStorage.getItem("New Todo");
    if (getLocalStorage == null) {
        arr = [];
    } else {
        arr = JSON.parse(getLocalStorage);
    }
    let newLiTag = '';
    arr.forEach((element, index) => {
        newLiTag += `<li> ${element} <span onclick="deleteTask(${index})" ><i class="fa fa-remove"></i></span></li>`
    });
    
    taskItems.innerHTML = newLiTag;
    inputBox.value = '';
}

// delete task items
function deleteTask(index) {
    let getLocalStorage = localStorage.getItem("New Todo");
    let arr = JSON.parse(getLocalStorage);

    arr.splice(index, 1);
    localStorage.setItem("New Todo", JSON.stringify(arr));
    showTasks();
}

