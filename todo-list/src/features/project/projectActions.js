import { projectObject } from "./projectObject";

export function saveProjectToLocalStorage(project) {
    const projects = JSON.parse(localStorage.getItem("projects")) || [];

    // Check if the project exists
    const existingIndex = projects.findIndex(p => p.name === project.name);

    if (existingIndex !== -1) {
        console.log("Updating project");
        // Updates existing project
        projects[existingIndex] = project.getProject(); 
    } else {
        // Add a new project
        projects.push(project.getProject()); 
    }

    localStorage.setItem("projects", JSON.stringify(projects));
}

export function loadProjectsFromLocalStorage() {
    return JSON.parse(localStorage.getItem("projects")) || [];
}

export function deleteProjectFromLocalStorage(projectName) {
    let projects = JSON.parse(localStorage.getItem("projects")) || [];
    projects = projects.filter(p => p.name !== projectName);
    localStorage.setItem("projects", JSON.stringify(projects));
}