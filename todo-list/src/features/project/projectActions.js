import { attachListeners } from "../todo/ui/TodoListeners";
import { createProjectInstance } from "./projectRenderer";
import { clearProjectDisplay } from "./projectUI";

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

export function deleteProjectFromLocalStorage(e) {
    // Stops event `bubbling up` to parent div
    e.stopPropagation();
    
    // Delete project
    const confirmDelete = confirm('Are you sure you want to delete this project?');
    if (!confirmDelete) { return; }
    
    const project = e.target.closest(".project");
    const projectId = project.dataset.id;
    let projects = JSON.parse(localStorage.getItem("projects")) || [];
    projects = projects.filter(p => p.id !== projectId);
    localStorage.setItem("projects", JSON.stringify(projects));

    project.remove();

    // Load next project in storage
    if (projects.length > 0) { 
        createProjectInstance(projects[0]);
        attachListeners();
    } else {
        clearProjectDisplay();
    }
    

}