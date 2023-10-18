document.addEventListener('DOMContentLoaded', ()=>{
  let todoForm = document.querySelector('form');
  let todoList = document.querySelector('.todo-list');

  const createListItem = (todoObj) => {
    let listItem = document.createElement('li');
    listItem.innerText = todoObj.title;
    todoObj.completed ? listItem.style.textDecoration = "line-through" : listItem.style.textDecoration = "none";
    todoList.appendChild(listItem);
    // Add a click event listener to list item
    listItem.addEventListener("click", () => {
      listItem.style.textDecoration = "line-through";

      fetch(`http://127.0.0.1:3000/todos/${todoObj.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          completed: true
        })
      })
    });
  }

  // GET - Read
  fetch('http://127.0.0.1:3000/todos')
    .then(res => res.json())
    .then(todos => {
      todos.forEach(todo => {
        console.log(todo);
        createListItem(todo);
      });
    });

  
  todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let inputElem = document.getElementById('input--add');

    createListItem(inputElem.value);
  
    // POST - Create
    // Add todo item to the database
    fetch('http://127.0.0.1:3000/todos', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        title: inputElem.value,
        completed: false
      })
    }).then(res => res.json())
      .then(todo => createListItem(todo));

    todoForm.reset(); // Clears the form fields
  })

});