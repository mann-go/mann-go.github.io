import { extractTodoForm, extractTodoData, populateForm, saveTodo  } from "./ui/TodoUI";
import { openEditTodoModal } from "../../modules/modalManager";

export function handleEditTodo(todoDiv) {
    const todoData = extractTodoData(todoDiv);
    populateForm(todoData);
    openEditTodoModal(() => {
        saveTodo(todoDiv);
    });
}

export function handleChangeTodoStatus(todo) {
    todo.classList.toggle('todo-done'); 
}

export function handleDeleteTodo(todo) {    
    const confirmDelete = confirm('Are you sure you want to delete this todo item?');
    if(confirmDelete) {
        // localStorageManager.
        todo.parentNode.remove();
        console.log('Todo item deleted');
    }
}