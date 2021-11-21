const root = document.getElementById('todo-interface')

function todoForm(add) {
    const container = document.createElement('form');

    container.innerHTML = `
        <input type="text" id="add" placeholder=" Add a new todo" />
        <button id="addbutton">+</button>
    `

    container.addEventListener("submit", (e) => {
        e.preventDefault();
        const value = container.querySelector("input").value
        add(value)
    });




    return container;
}

function ListItem(todo, onChange) {
    const container = document.createElement('div');
    container.setAttribute("id", "listitem")
    container.innerHTML = `
        <label>
                <input type='checkbox' ${todo.completed ? "checked" : ""} id="checkitem"/>
                <div id = 'todoname'>${todo.todoit}</div>
        </label>
    `

    const input = container.querySelector("input")
    input.addEventListener("change", (e) => {
        onChange(e.target.checked)
    })


    return container;
}

function List(todos, onChange) {
    const container = document.createElement('div')
    container.setAttribute("id", "list")

    todos.map(todo => {
        return ListItem(todo, (change) => {
            todo.completed = change;
            onChange();
        })
    }).forEach(element => {
        container.appendChild(element)
    });

    return container
}

function todoFooter(todos, onChange) {
    const container = document.createElement('div')
    container.setAttribute("id", "slash")

    const completed = todos.filter(todo => todo.completed === true).length;
    container.innerHTML = `
        <span>${completed} / ${todos.length}</span>
    `;

    const btn = document.getElementById('deletechecked')
    btn.addEventListener("click", () => {
        onChange(todos.filter((todo) => todo.completed === false))
    })


    return container;
}

function App() {

    let todos = [
        { todoit: "todo 1", completed: false },
        { todoit: "todo 2", completed: false },
        { todoit: "todo 3", completed: false }
    ];

    let container = document.createElement("div")
    container.setAttribute('id', 'todolist')


    function update() {
        container.innerHTML = ""
        container.appendChild(todoForm(function (newTodo) {
            todos.push({
                todoit: newTodo,
                completed: false
            });
            update()
        }));
        container.appendChild(List(todos, () => {
            update()
        }));
        container.appendChild(todoFooter(todos, (newTodos) => {
            todos = newTodos;
            update();
        }));
    }
    update()



    return container;



}
root.appendChild(App());

let addbtn = document.getElementById("add")
addbtn.onmouseover = function () {
    addbtn.style.height = '60px'
    addbtn.style.transition = '0.3s'
    addbtn.style.fontSize = '25px'
    addbtn.style.backgroundColor = '#0088ff'
    addbtn.style.top = '-65px'
}
addbtn.onmouseout = function () {
    addbtn.style.height = '50px'
    addbtn.style.transition = '0.3s'
    addbtn.style.fontSize = '30px'
    addbtn.style.backgroundColor = '#3498F1'
    addbtn.style.top = '-70px'
}

let addbutton = document.getElementById('addbutton')
addbutton.onmouseover = function () {
    addbutton.style.width = '60px'
    addbutton.style.height = '60px'
    addbutton.style.fontSize = '35px'
    addbutton.style.transition = '0.3s'
}
addbutton.onmouseout = function () {
    addbutton.style.width = '50px'
    addbutton.style.height = '50px'
    addbutton.style.fontSize = '40px'
    addbutton.style.transition = '0.3s'
}
let delcheck = document.getElementById('deletechecked')
delcheck.onmouseover = function () {
    delcheck.style.width = '210px'
    delcheck.style.height = '40px'
    delcheck.style.fontSize = '15px'
    delcheck.style.transition = '0.3s'
}
delcheck.onmouseout = function () {
    delcheck.style.width = '200px'
    delcheck.style.height = '30px'
    delcheck.style.fontSize = '18px'
    delcheck.style.transition = '0.3s'
}