'use strict';

const todoForm = document.querySelector('.todo__form');
const todoInput = document.querySelector('.todo__input');
const todoItemsList = document.querySelector('.todo__items');
let todos = [];


todoForm.addEventListener('submit', function (event) {
  event.preventDefault();
  addTodo(todoInput.value);
});

function addTodo(item) {
  if (item !== '') {
    const todo = {
      id: Date.now(),
      name: item,
      completed: false
    };

    todos.push(todo);
    addToLocalStorage(todos);
    todoInput.value = '';
  }
}

const createAnyELement = (name, attributes) => {
  let element = document.createElement(name);
  for (let k in attributes) {
    element.setAttribute(k, attributes(k));
  }
  return element;
}

function renderTodos(todos) {
  todoItemsList.innerHTML = '';

  todos.forEach(function (item) {
    const checked = item.completed ? 'checked' : null;

    const li = document.createElement('li');
    li.setAttribute('class', 'todo__item');
    li.setAttribute('data-key', item.id);
    if (item.completed === true) {
      li.classList.add('checked');
    }

    const liTemplate = `
      <input type="checkbox" class="todo__checkbox" ${checked}>
      <span class="item__text">${item.name}</span>
      <button class="todo__deleteBtn"><i class="fa fa-trash" aria-hidden="true"></i></button>
      `;
    li.insertAdjacentHTML('afterbegin', liTemplate);

    todoItemsList.append(li);
  });
  
  document.querySelector('.item__count').textContent = todos.length;
}

function addToLocalStorage(todos) {
  localStorage.setItem('todos', JSON.stringify(todos));
  renderTodos(todos);
}

function getFromLocalStorage() {
  const reference = localStorage.getItem('todos');
  if (reference) {
    todos = JSON.parse(reference);
    renderTodos(todos);
  }
}

function toggle(id) {
  todos.forEach(function (item) {
    if (item.id == id) {
      item.completed = !item.completed;
    }
  });

  addToLocalStorage(todos);
}

function deleteTodo(id) {
  todos = todos.filter(function (item) {
    return item.id != id;
  });

  addToLocalStorage(todos);
}

getFromLocalStorage();

todoItemsList.addEventListener('click', function (event) {
  if (event.target.type === 'checkbox') {
    toggle(event.target.parentElement.getAttribute('data-key'));
  }

  if (event.target.classList.contains('todo__deleteBtn')) {
    deleteTodo(event.target.parentElement.getAttribute('data-key'));
  }

  if (event.target.classList.contains('todo__deleteBtn').childNodes) {
    deleteTodo(event.target.parentElement.getAttribute('data-key'));
  }
});