import { todoObject } from "../features/todo/todoObject";
import { extractTodoForm } from "../features/todo/ui/TodoUI";
import { createTodoElement } from "../features/todo/ui/TodoRenderer";
import { toggleModal, resetForm } from "./modalManager";
import { attachListeners } from "../features/todo/ui/TodoListeners";

import { extractNewProjectForm } from "../features/project/projectUI";
import { addTodoToCurrentProject, editTodoInCurrentProject, createNewProject } from "../features/project/projectManager";
import { updateProjectList } from "../features/project/projectUI";

export function handleNewTodoSubmit(e) {
    e.preventDefault();

    // Create a new todoObject, set its data to that of the new todoForm
    const todo = new todoObject;
    const todoInfo = extractTodoForm();
    todo.setTodo(todoInfo);

    // Create HTML for the todo, and add that todo to localStorage
    createTodoElement(todo);
    attachListeners();
    addTodoToCurrentProject(todo);
    
    toggleModal('todo-add-modal', false);
    resetForm('todo-add-form');
};

export function handleNewProjectSubmit(e) {
    e.preventDefault();
    const projectInfo = extractNewProjectForm();
    createNewProject(null, projectInfo.name, projectInfo.desc, projectInfo.dueDate, []);
    updateProjectList();
    alert("Project created successfully");
    toggleModal('new-project-modal', false);
}

export function handleEditTodoSubmit(e) {
    e.preventDefault();
    console.log("Attempt edit todo submit:");
    // const updatedTodo = saveTodo(todoDiv);
    // handleEditTodoSubmit(updatedTodo);
    // // editTodoInCurrentProject(updatedTodo);
    // // localStorageManager.updateLocalStorageTodoEntry('todos', updatedTodo);

    // console.log(updatedTodo.id, "has been updated");
    // // editTodoInCurrentProject(updatedTodo);
    // // const updatedTodo = saveTodo(todoDiv);
    // // editTodoInCurrentProject(updatedTodo);
    // // console.log("Handle edit todo submit");


}