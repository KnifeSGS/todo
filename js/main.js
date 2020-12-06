'use strict';

const todoForm = document.querySelector('.todo__form');
const todoInput = document.querySelector('.todo__input');
const todoItemsList = document.querySelector('.todo__items');
let todos = [];
let uncheckedTodos = 0;
let checkedCounter = 0;


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
      <button type="button" class="todo__deleteBtn"><i class="fa fa-trash" aria-hidden="true"></i></button>
      `;
    li.insertAdjacentHTML('afterbegin', liTemplate);

    todoItemsList.append(li);
  });
  uncheckedCounter();
  dayToday();
  dateToday();
}

const dayToday = () => {
  const now = new Date();
  const weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
  const today = weekday[now.getDay()];
  // return today;
  document.querySelector('.date__dayName').textContent = today;
}

const dateToday = () => {
  const now = new Date();
  const date = now.toLocaleDateString('nl-NL')
  // return date;
  document.querySelector('.date__today').textContent = date;
}

const uncheckedCounter = () => {
  let counter = [];
  todos.filter(item => {
    if (item.completed === false){
      counter.push(item);
    }
  })
  document.querySelector('.item__count').textContent = counter.length;
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