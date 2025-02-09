import { extractTodoData, populateForm, saveTodo  } from "./ui/TodoUI";
import { toggleModal } from "../../modules/modalManager";
import { editTodoInCurrentProject, deleteTodoFromCurrentProject, updateTodoStatusInCurrentProject } from "../project/projectManager";
import { handleEditTodoSubmit } from "../../modules/formHandlers";

// TODO: Needs fixed, needs split into more pieces.
export function handleEditTodo(todoDiv) {
    const todoData = extractTodoData(todoDiv);
    populateForm(todoData);
    toggleModal('todo-edit-modal');
}

export function handleChangeTodoStatus(todo) {
    console.log("Change todo status:");
    const todoId = todo.dataset.id;
    updateTodoStatusInCurrentProject(todoId);
}

export function handleDeleteTodo(todo) {  
    console.log(todo.id);  
    const confirmDelete = confirm('Are you sure you want to delete this todo item?');
    if(confirmDelete) {
        const todoId = todo.dataset.id;
        deleteTodoFromCurrentProject(todoId);
        todo.parentNode.remove();
        console.log('Todo item deleted');
    }
}
