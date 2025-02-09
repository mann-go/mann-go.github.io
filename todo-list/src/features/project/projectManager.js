// Manages the current project in the session
import { projectObject } from "./projectObject";
import { saveProjectToLocalStorage, loadProjectsFromLocalStorage } from "./projectActions";
import { todoObject } from "../todo/todoObject";
import { createProjectInstance, reRenderProjectTodos } from "./projectRenderer";

let currentProject = null;

export function createNewProject(id, name, description, dueDate, todos = []) {
    currentProject = new projectObject(id, name, description, dueDate, todos);
    saveProjectToLocalStorage(currentProject);
    loadProjectById(currentProject.id);
    return currentProject;
}

export function getCurrentProject() {
    return currentProject;
}

// Kind of works, kind of scuffed. Needs improving to find last project accessed.
export function loadProjectNextDue() {
    const projects = loadProjectsFromLocalStorage();
    const nextProjectDue = projects[0];
    const projectToLoad = loadProjectById(nextProjectDue.id);
    createProjectInstance(projectToLoad);
}

export function loadProjectById(id) {
    const projects = loadProjectsFromLocalStorage();
    const foundProject = projects.find(i => i.id === id);

    if (foundProject) {
        currentProject = new projectObject(
            foundProject.id,
            foundProject.name,
            foundProject.description,
            foundProject.dueDate,
            foundProject.todos.map(todo => new todoObject(
                todo.id,
                todo.name,
                todo.description,
                todo.dueDate,
                todo.priority,
                todo.notes,
                todo.completed,
            )),
        );
        return currentProject;
    }

    return null;
}

export function addTodoToCurrentProject(todo) {
    if (currentProject) {
        currentProject.addTodo(todo);
        saveProjectToLocalStorage(currentProject);
    } else {
        console.error("No active project selected");
    }
}

export function editTodoInCurrentProject(todo) {
    if (currentProject) {
        currentProject.editTodo(todo);
        saveProjectToLocalStorage(currentProject);
        reRenderProjectTodos(currentProject.id);
    } else {
        console.error("No active project selected");
    } 
}

export function updateTodoStatusInCurrentProject(todoId) {
    if (currentProject) {
        currentProject.updateTodoCompletionStatus(todoId);
        saveProjectToLocalStorage(currentProject);
        reRenderProjectTodos(currentProject.id);
    } else {
        console.error("No active project selected");
    }
}

export function deleteTodoFromCurrentProject(todoId) {
    if (currentProject) {
        currentProject.deleteTodoById(todoId);
        saveProjectToLocalStorage(currentProject);
    } else {
        console.error("No active project selected");
    }
}