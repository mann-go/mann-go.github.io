// Manages the current project in the session
import { projectObject } from "./projectObject";
import { saveProjectToLocalStorage, loadProjectsFromLocalStorage } from "./projectActions";
import { todoObject } from "../todo/todoObject";

let currentProject = null; // Holds active project

export function createNewProject(id, name, desc, dueDate, todos = []) {
    currentProject = new projectObject(id, name, desc, dueDate, todos);
    saveProjectToLocalStorage(currentProject);
    return currentProject;
}

export function getCurrentProject() {
    return currentProject;
}

export function loadProjectById(id) {
    const projects = loadProjectsFromLocalStorage();
    const foundProject = projects.find(i => i.id === id);

    if (foundProject) {
        currentProject = new projectObject(
            foundProject.id,
            foundProject.name,
            foundProject.desc,
            foundProject.dueDate,
            foundProject.todos.map(todo => new todoObject(
                todo.id,
                todo.name,
                todo.desc,
                todo.dueDate,
                todo.priority,
                todo.notes
            )),
        );
        return currentProject;
    }

    return null;
}

export function addTodoToCurrentProject(todo) {
    console.log("Project:", currentProject);
    console.log("Todo to be added:", todo);
    if (currentProject) {
        currentProject.addTodo(todo);
        saveProjectToLocalStorage(currentProject);
    } else {
        console.error("No active project selected");
    }
}