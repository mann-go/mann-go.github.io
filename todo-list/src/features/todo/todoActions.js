import { extractTodoData, populateForm, saveTodo  } from "./ui/TodoUI";
import { openEditTodoModal } from "../../modules/modalManager";
import localStorageManager from "../../modules/localStorage";

export function handleEditTodo(todoDiv) {
    const todoData = extractTodoData(todoDiv);
    populateForm(todoData);
    openEditTodoModal(() => {
        const updatedTodo = saveTodo(todoDiv);
        localStorageManager.updateLocalStorageTodoEntry('todos', updatedTodo);
    });
}

export function handleChangeTodoStatus(todo) {
    todo.classList.toggle('todo-done'); 
}

export function handleDeleteTodo(todo) {    
    const confirmDelete = confirm('Are you sure you want to delete this todo item?');
    if(confirmDelete) {
        const todoId = todo.dataset.id;
        localStorageManager.removeLocalStorageEntry('todos', todoId);
        todo.parentNode.remove();
        console.log('Todo item deleted');
    }
}
