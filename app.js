const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const taskItems = document.querySelector(".task-items");

//on page refresh loads data from local storage
showTasks();

// will fetch records from local storage and add them as inside ul as li tags
function showTasks() {
  checkStorage();
  let newLiTag = "";
  arr.forEach((element, index) => {
    newLiTag += `<li> ${element} <span onclick="deleteTask(${index})" ><i class="fa fa-remove"></i></span></li>`;
  });

  taskItems.innerHTML = newLiTag;
  inputBox.value = "";
}

// saves user input in browser local storage
function save() {
  let userData = inputBox.value;
  if (userData.trim().length == 0) {
    alert("Please enter task!");
  } else {
    checkStorage();
    arr.push(userData);
    localStorage.setItem("New Todo", JSON.stringify(arr));
    return arr;
  }
}

function checkStorage() {
  let getLocalStorage = localStorage.getItem("New Todo");
  if (getLocalStorage == null) {
    arr = [];
  } else {
    arr = JSON.parse(getLocalStorage);
  }
}

// handles input event like click and keypress
function handleInput(event) {
  if (
    event.type === "click" ||
    (event.type === "keypress" && event.key === "Enter")
  ) {
    save();
    showTasks();
  }
}

addBtn.addEventListener("click", handleInput);
inputBox.addEventListener("keypress", handleInput);

// inputBox.addEventListener("keypress", function (event) {
//   if (event.key === "Enter") {
//     save();
//   }
// });

// delete task items
function deleteTask(index) {
  checkStorage();
  arr.splice(index, 1);
  localStorage.setItem("New Todo", JSON.stringify(arr));
  showTasks();
}
