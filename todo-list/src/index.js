import "./styles.css";
import TodoManager from "./modules/todo/todoManager.js";
import { openTodoModal, closeTodoModal, resetTodoModal } from "./modules/modal/modalManager.js";

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

const submitNewTodoForm = document.getElementById('todo-modal');
submitNewTodoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const todoInfo = TodoManager.extractInfo();
    TodoManager.addTodo(todoInfo);
    closeTodoModal();
    resetTodoModal();
});


const submitEditTodoForm = document.getElementById('todo-edit-modal');
submitNewTodoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const todoInfo = TodoManager.extractInfo();
    TodoManager.addTodo(todoInfo);
    closeTodoModal();
    resetTodoModal();
});