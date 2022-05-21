let addBtn = document.querySelector("button");
let input = document.querySelector("input");
let todoBox = document.querySelector("ul");
let box = document.querySelector("#box");

document.addEventListener("DOMContentLoaded", getTodos);

addBtn.addEventListener("click", function(event) {
    event.preventDefault();

    if (input.value === "") {
        swal("warning", "The input value empty!", "warning");
    } else {
        box.classList.add("todos");
        const todos = document.createElement("div");
        todos.classList.add(".todo-box");
        const newTodo = document.createElement("li");
        newTodo.classList.add("todo");
        newTodo.innerText = input.value;
        //add to localStorage
        let todosList = [];
        if (localStorage.getItem("todosList") === null) {
            todosList = [];
        } else {
            todosList = JSON.parse(localStorage.getItem("todosList"));
        }
        todosList.push(input.value);
        localStorage.setItem("todosList", JSON.stringify(todosList));
        //
        const btns = document.createElement("div");
        btns.classList.add("btn");
        newTodo.appendChild(btns);
        const btn1 = document.createElement("button");
        btn1.innerText = "Completed";
        const btn2 = document.createElement("button");
        btn2.innerText = "Delete";
        btns.appendChild(btn1);
        btns.appendChild(btn2);
        btn1.addEventListener("click", completedTodo);

        todos.appendChild(newTodo);
        todoBox.appendChild(todos);

        //empty the input
        input.value = "";
        //reload the window
        // window.location.reload();
    }

    //create a new div
});

//delete item
function deleteTodo(e) {
    e.target.parentNode.parentNode.classList.toggle("delete");
    e.target.parentNode.parentNode.remove();
    //delete specific item from localstorage array

    let todosList = JSON.parse(localStorage.getItem("todosList"));
    // console.log(todosList[0]);
    todosList.forEach(function(todo, index) {
        if (todo === e.target.parentNode.parentNode.innerHTML.split("<")[0]) {
            console.log(todo);
            // console.log();
            todosList.splice(index, 1);
        }
    });
    localStorage.setItem("todosList", JSON.stringify(todosList));
}

//completed item
function completedTodo(e) {
    e.target.parentNode.parentNode.classList.toggle("completed");
}

////////////////////////////////
// get todosList and put them inthe dom content
function getTodos() {
    let todosList;
    if (localStorage.getItem("todosList") === null) {
        todosList = [];
    } else {
        todosList = JSON.parse(localStorage.getItem("todosList"));
    }
    todosList.forEach(function(todo) {
        box.classList.add("todos");
        const todos = document.createElement("div");
        todos.classList.add(".todo-box");
        const newTodo = document.createElement("li");
        newTodo.classList.add("todo");
        newTodo.innerText = todo;
        const btns = document.createElement("div");
        btns.classList.add("btn");
        newTodo.appendChild(btns);
        const btn1 = document.createElement("button");
        btn1.innerText = "Completed";
        const btn2 = document.createElement("button");
        btn2.innerText = "Delete";
        btns.appendChild(btn1);
        btns.appendChild(btn2);
        btn2.addEventListener("click", deleteTodo);
        btn1.addEventListener("click", completedTodo);

        todos.appendChild(newTodo);
        todoBox.appendChild(todos);
    });
}