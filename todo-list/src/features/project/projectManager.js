// Manages the current project in the session
import { projectObject } from "./projectObject";
import { saveProjectToLocalStorage, loadProjectsFromLocalStorage } from "./projectActions";
import { todoObject } from "../todo/todoObject";

let currentProject = null; // Holds active project

export function createNewProject(id, name, desc, dueDate) {
    currentProject = new projectObject(id, name, desc, dueDate, []);
    saveProjectToLocalStorage(currentProject);
    return currentProject;
}

export function getCurrentProject() {
    return currentProject;
}

export function loadProjectByName(name) {
    const projects = loadProjectsFromLocalStorage();
    const foundProject = projects.find(p => p.name === name);

    if (foundProject) {
        currentProject = new projectObject(
            foundProject.name,
            foundProject.desc,
            foundProject.todos.map(todo => new todoObject(
                todo.id,
                todo.name,
                todo.desc,
                todo.dueDate,
                todo.priority,
                todo.notes
            )),
            foundProject.dueDate
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