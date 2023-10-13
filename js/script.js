document.addEventListener('DOMContentLoaded', ()=>{
  let form = document.querySelector('form');
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let inputElem = document.getElementById('todo-text');
    let todoList = document.getElementById('todo-list');

    let listItem = document.createElement('li');
    console.log(listItem)
    listItem.innerText = inputElem.value;
    todoList.appendChild(listItem);
  })

});

