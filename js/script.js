document.addEventListener('DOMContentLoaded', ()=>{
  let todoForm = document.querySelector('form');
  let todoList = document.querySelector('.todo-list');

  // GET - Read
  fetch('http://127.0.0.1:3000/todos')
    .then(res => res.json())
    .then(todos => {
      todos.forEach(todo => {
        let listItem = document.createElement('li');
        listItem.innerText = todo.title;
        todoList.appendChild(listItem);
      });
    });

  
  todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let inputElem = document.getElementById('input--add');

    let listItem = document.createElement('li');
    console.log(listItem)
    listItem.innerText = inputElem.value;
    todoList.appendChild(listItem); // Add new todo item to the DOM
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
    });

    todoForm.reset(); // Clears the form fields
  })

});