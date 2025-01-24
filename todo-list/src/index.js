import "./styles.css";
import TodoManager from "./features/todo/todoManager.js"
import { createTodoElement } from "./features/todo/ui/TodoRenderer.js";
import { renderTodos, extractTodoData, extractTodoForm } from "./features/todo/ui/TodoUI.js";
import { openTodoModal, closeTodoModal, resetTodoModal } from "./modules/modalManager.js";
import localStorageManager from "./modules/localStorage.js";
import { todoObject } from "./features/todo/todoObject.js";
import { attachListeners } from "./features/todo/ui/TodoListeners.js";

/* ASIDE FUNCTIONS */
const resizeButton = document.querySelector('[data-resize-btn]');
resizeButton.addEventListener('click', function(e) {
    e.preventDefault();
    document.body.classList.toggle('sb-expanded');
});

/* MODAL FUNCTIONS */
var span = document.getElementsByClassName("close")[0];

span.onclick = function() {
    closeTodoModal();
}

/* TODO FUNCTIONALITY */
const addTodoButton = document.getElementById('add-todo');
addTodoButton.addEventListener("click", (e) => {
    e.preventDefault();
    
    openTodoModal();
});

const submitNewTodoForm = document.getElementById('todo-add-modal');
submitNewTodoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Create a new todoObject, set its data to that of the new todoForm
    const todo = new todoObject;
    const todoInfo = extractTodoForm();
    todo.setTodo(todoInfo);

    // Create HTML for the todo, and add that todo to localStorage
    createTodoElement(todo);
    attachListeners();
    TodoManager.addTodo(todo);
    closeTodoModal();
    resetTodoModal();
});


const submitEditTodoForm = document.getElementById('todo-edit-modal');
submitEditTodoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const todoInfo = extractInfo();
    console.log("EDIT: ", todoInfo);

    TodoManager.addTodo(todoInfo);
    closeTodoModal();
    resetTodoModal();
});

document.addEventListener("DOMContentLoaded", () => {
    localStorageManager.loadLocalStorage();
    const todos = TodoManager.getTodos();
    console.log("TODOS ON LOAD:", todos);
    renderTodos(todos);
})

/* DEV TOOLS */
const logLocalStorage = document.getElementById('log-local-storage');
logLocalStorage.addEventListener("click", localStorageManager.logLocalStorageItems);

const deleteLocalStorage = document.getElementById('delete-local-storage');
deleteLocalStorage.addEventListener("click", localStorageManager.deleteLocalStorage);