import "./styles.css";
import TodoManager from "./features/todo/todoManager.js"
import { createTodoElement } from "./features/todo/ui/TodoRenderer.js";
import { renderTodos, extractTodoForm } from "./features/todo/ui/TodoUI.js";
import { toggleModal, resetForm } from "./modules/modalManager.js";
import localStorageManager from "./modules/localStorage.js";
import { todoObject } from "./features/todo/todoObject.js";
import { attachListeners } from "./features/todo/ui/TodoListeners.js";
import { attachProjectUIListeners } from "./features/project/projectUI.js";
import { createNewProject } from "./features/project/projectManager.js";

attachListeners();
attachProjectUIListeners();

/* ASIDE FUNCTIONS */
const resizeButton = document.querySelector('[data-resize-btn]');
resizeButton.addEventListener('click', function(e) {
    e.preventDefault();
    document.body.classList.toggle('sb-expanded');
});

/* MODAL FUNCTIONS */
document.querySelectorAll(".close").forEach((closeButton) => {
    closeButton.addEventListener("click", () => {
        const modal = closeButton.closest(".modal");
        if (modal) toggleModal(modal.id, false);
    })
})

/* TODO FUNCTIONALITY */
const addTodoButton = document.getElementById('add-todo');
addTodoButton.addEventListener("click", (e) => {
    e.preventDefault();
    
    toggleModal('todo-add-modal');
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
    
    toggleModal('todo-add-modal');
    resetForm('todo-add-form');
});


// const submitEditTodoForm = document.getElementById('todo-edit-modal');
// submitEditTodoForm.addEventListener("submit", (e) => {
//     e.preventDefault();
    
//     const todoInfo = extractInfo();
//     console.log("EDIT: ", todoInfo);

//     TodoManager.addTodo(todoInfo);
//     toggleModal('todo-edit-modal');
//     resetForm('todo-edit-form');
// });

document.addEventListener("DOMContentLoaded", () => {
    localStorageManager.loadLocalStorage();
    const todos = TodoManager.getTodos();
    console.log("TODOS ON LOAD:", todos);
    renderTodos(todos);

    // createNewProject("Test 2", "Test description", "02/02/25");
    
    // createNewProject(null, "Test 5", "Test description 5", "05/02/25", []);
    createNewProject(null, "Test 6", "Test description 6", "06/02/25");
    createNewProject(null, "Test 7", "Test description 8", "07/02/25");
    createNewProject(null, "Test 8", "Test description 8", "08/02/25");
})

/* DEV TOOLS */
const logLocalStorage = document.getElementById('log-local-storage');
logLocalStorage.addEventListener("click", localStorageManager.logLocalStorageItems);

const deleteLocalStorage = document.getElementById('delete-local-storage');
deleteLocalStorage.addEventListener("click", localStorageManager.deleteLocalStorage);