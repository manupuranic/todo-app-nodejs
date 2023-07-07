const baseUrl = "http://localhost:3000/todos";

const form = document.getElementById("add-todo");
const pendingList = document.getElementById("pendingList");
const completedList = document.getElementById("completedList");

const deleteHandler = async (e) => {
  const li = e.target.parentElement.parentElement;
  const id = li.id;
  try {
    const res = await axios.delete(`${baseUrl}/delete-todo/${id}`);
    getTodos();
  } catch (err) {
    console.log(err);
  }
};

const doneHandler = async (e) => {
  const li = e.target.parentElement.parentElement;
  const id = li.id;
  try {
    const res = await axios.post(`${baseUrl}/done-todo/${id}`);
    getTodos();
  } catch (err) {
    console.log(err);
  }
};

const displayTodos = (todo, completed) => {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const doneBtn = document.createElement("button");

  const spanTodo = document.createElement("span");
  const spanDesc = document.createElement("span");
  const spanCheckIcon = document.createElement("span");
  const spanDeleteIcon = document.createElement("span");

  li.className = "list-group-item";
  li.id = todo.id;
  delBtn.className = "btn btn-danger li-btn delete";
  doneBtn.className = "btn btn-success li-btn edit";
  spanDesc.className = "span-desc";
  spanTodo.className = "span-todo";
  spanCheckIcon.className = "material-symbols-outlined icon";
  spanDeleteIcon.className = "material-symbols-outlined icon";

  spanTodo.appendChild(document.createTextNode(todo.todoName));
  spanDesc.appendChild(document.createTextNode(todo.desc));

  const text = completed ? "redo" : "done";
  spanCheckIcon.appendChild(document.createTextNode(text));
  spanDeleteIcon.appendChild(document.createTextNode("close"));
  delBtn.appendChild(spanDeleteIcon);
  doneBtn.appendChild(spanCheckIcon);

  delBtn.addEventListener("click", deleteHandler);
  doneBtn.addEventListener("click", doneHandler);

  li.appendChild(spanTodo);
  li.appendChild(spanDesc);
  li.appendChild(delBtn);
  li.appendChild(doneBtn);

  if (completed) {
    completedList.appendChild(li);
  } else {
    pendingList.appendChild(li);
  }
};

const getTodos = async () => {
  completedList.replaceChildren();
  pendingList.replaceChildren();
  try {
    const result = await axios.get(baseUrl);
    const todos = result.data;
    todos.forEach((todo) => {
      displayTodos(todo, todo.completed);
    });
  } catch (err) {
    console.log(err);
  }
};

document.addEventListener("DOMContentLoaded", getTodos);

const submitHandler = async (e) => {
  e.preventDefault();
  const todoName = document.getElementById("todoName");
  const desc = document.getElementById("desc");
  const todoDetails = {
    todoName: todoName.value,
    desc: desc.value,
  };
  const result = await axios.post(`${baseUrl}/add-todo`, todoDetails);
  displayTodos(result.data, false);
  todoName.value = "";
  desc.value = "";
};

form.addEventListener("submit", submitHandler);
