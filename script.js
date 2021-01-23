window.onload = function () {
  const form = document.getElementById('form');

  const todos = JSON.parse(localStorage.getItem('todo'));
  if (todos) {
    todos.forEach((todo) => {
      addToDo(todo);
    });
  }
  console.log(todos);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    addToDo();
  });
};

function addToDo(todo) {
  const todoUL = document.getElementById('todos');
  const input = document.getElementById('input');
  let todoText = input.value;

  if (todo) {
    todoText = todo.text;
  }
  if (todoText) {
    const todoEl = document.createElement('li');
    if (todo && todo.completed) {
      todoEl.classList.add('completed');
    }
    todoEl.innerText = todoText;

    todoEl.addEventListener('click', () => {
      todoEl.classList.toggle('completed');
      updateLS();
    });

    todoEl.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      todoEl.remove();
      updateLS();
    });

    todoUL.appendChild(todoEl);
    updateLS();
    input.value = '';
  }
}

function updateLS() {
  const todosEL = document.querySelectorAll('li');
  const todos = [];

  todosEL.forEach((todoEl) => {
    todos.push({
      text: todoEl.innerText,
      completed: todoEl.classList.contains('completed'),
    });
  });
  localStorage.setItem('todo', JSON.stringify(todos));
}
