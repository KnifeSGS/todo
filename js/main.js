'use strict';

const todoForm = document.querySelector('.todo__form');
const todoInput = document.querySelector('.todo__input');
const todoItemsList = document.querySelector('.todo__items');
const todoItemsChecked = document.querySelector('.todo__items--checked');
let todos = [];
let uncheckedTodos = 0;

todoForm.addEventListener('submit', function (event) {
  event.preventDefault();
  addTodo(todoInput.value);
});

const addTodo = (item) => {
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

const renderTodos = (todos) => {
  todoItemsList.innerHTML = '';
  todoItemsChecked.innerHTML = '';

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

    if (item.completed === true) {
      todoItemsChecked.append(li);
      setTimeout(function(){
        li.classList.add('show');
      }, 10);
    } else {
      todoItemsList.append(li);
      setTimeout(function(){
        li.classList.add('show');;
      }, 10);
    }
  });
  uncheckedCounter();
  completedTaskPercent();
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
  document.querySelector('.date__dayName').textContent = today;
}

const dateToday = () => {
  const now = new Date();
  const date = now.toLocaleDateString('nl-NL')
  document.querySelector('.date__today').textContent = date;
}
dayToday();
dateToday();

const chillTemplate = `
                      <div class="chill">
                        <img src="./img/beach.png" alt="SunShade" width="100px">
                        <span>
                        Time to chill! You have no todos.
                        </span>
                      </div>
                      `;

const uncheckedCounter = () => {
  let counter = [];
  todos.filter(item => {
    if (item.completed === false) {
      counter.push(item);
    }
  })
  document.querySelector('.item__count').textContent = counter.length;

  if (counter.length === 0) {
    todoItemsList.innerHTML = chillTemplate
  }
}

const completedTaskPercent = () => {
  let counter = [];
  todos.filter(item => {
    if (item.completed === false) {
      counter.push(item);
    }
  })
  document.querySelector('.progressPercent').textContent = parseInt((todos.length - counter.length) * 100 / todos.length);
}

const addToLocalStorage = (todos) => {
  localStorage.setItem('todos', JSON.stringify(todos));
  renderTodos(todos);
}

const getFromLocalStorage = () => {
  const reference = localStorage.getItem('todos');
  if (reference) {
    todos = JSON.parse(reference);
    renderTodos(todos);
  }
}

const toggle = (id) => {
  todos.forEach(function (item) {
    if (item.id == id) {
      item.completed = !item.completed;
    }
  });

  addToLocalStorage(todos);
}

const deleteTodo = (id) => {
  todos = todos.filter(function (item) {
    return item.id != id;
  });

  addToLocalStorage(todos);
}

getFromLocalStorage();

todoItemsList.addEventListener('click', function (ev) {
  if (ev.target.type === 'checkbox') {
    toggle(ev.target.parentElement.getAttribute('data-key'));
  }

  if (ev.target.classList.contains('fa-trash')) {
    deleteTodo(ev.target.parentElement.parentElement.getAttribute('data-key'));
  }
});

todoItemsChecked.addEventListener('click', function (ev) {
  if (ev.target.type === 'checkbox') {
    toggle(ev.target.parentElement.getAttribute('data-key'));
  }

  if (ev.target.classList.contains('fa-trash')) {
    deleteTodo(ev.target.parentElement.parentElement.getAttribute('data-key'));
  }
});

document.querySelector('.todos__hide').addEventListener('click', () => {
  document.querySelector('.todo__items--checked').classList.toggle('autoHideChecked')
});

document.querySelector('.todos__hide').addEventListener('click', () => {
  document.querySelector('.progress').classList.toggle('autoHideChecked')
});

const clearTodos = () => {
  localStorage.removeItem('todos')
};

document.querySelector('.todos__clear').addEventListener('click', () => {
  clearTodos();
  location.reload();
});