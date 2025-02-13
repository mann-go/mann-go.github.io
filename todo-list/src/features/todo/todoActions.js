import { extractTodoData, populateForm } from "./ui/TodoUI";
import { toggleModal } from "../../modules/modalManager";
import { deleteTodoFromCurrentProject, updateTodoStatusInCurrentProject } from "../project/projectManager";


export function handleEditTodo(todoDiv) {
    const todoId = todoDiv.dataset.id;
    const todoData = extractTodoData(todoId, todoDiv);
    populateForm(todoData);
    toggleModal('todo-edit-modal');
}

export function handleChangeTodoStatus(todo) {
    const todoId = todo.dataset.id;
    updateTodoStatusInCurrentProject(todoId);
}

export function handleDeleteTodo(todo) {  
    const confirmDelete = confirm('Are you sure you want to delete this todo item?');
    if(confirmDelete) {
        const todoId = todo.dataset.id;
        deleteTodoFromCurrentProject(todoId);
        todo.parentNode.remove();
    }
}
