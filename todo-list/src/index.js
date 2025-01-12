import "./styles.css";
import createTodo from "./modules/createTodo";
import extractTodo from "./modules/extractTodoForm";
import deleteTodo from "./modules/deleteTodo";

/* ASIDE FUNCTIONS */
const resizeButton = document.querySelector('[data-resize-btn]');
resizeButton.addEventListener('click', function(e) {
    e.preventDefault();
    document.body.classList.toggle('sb-expanded');
});

/* MODAL FUNCTIONS */
var span = document.getElementsByClassName("close")[0];

span.onclick = function() {
    submitTodoForm.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == submitTodoForm) {
        submitTodoForm.style.display = "none";
    }
}

/* TODO FUNCTIONALITY */
const addTodoButton = document.getElementById('add-todo');
addTodoButton.addEventListener("click", (e) => {
    e.preventDefault();
    submitTodoForm.style.display = "block";
});

const submitTodoForm = document.getElementById('todo-add-modal');
submitTodoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const todoInfo = extractTodo();
    createTodo(todoInfo.todoName, todoInfo.todoDesc, todoInfo.todoDueDate, todoInfo.todoPriority, todoInfo.todoNotes);

    submitTodoForm.style.display = "none";

});

/* Doesn't really work, targets the first todo item */
// const deleteTodoButton = document.getElementById('deleteTodoButton');
// deleteTodoButton.addEventListener("click", (e) => {
//     deleteTodo(e);
// });