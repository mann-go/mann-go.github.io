import { attachListeners } from "../todo/ui/TodoListeners";
import { loadProjectById } from "./projectManager";
import { createProjectElement, createProjectInstance } from "./projectRenderer";

const eventHandlers = [
        { selector: '#project', action: 'click', handler: handleLoadingProject },
        // { selector: '#loadProjectButton', action: 'click', handler: handleLoadingProject },
        
]

export function attachProjectUIListeners() {
    eventHandlers.forEach(({ selector, action, handler }) => {
        const elements = document.querySelectorAll(selector);
        if (elements.length > 0) {
            elements.forEach((element) => {
                element.addEventListener(action, (e) => {
                    handler(e);
                });
            })
        }
    })
}

function handleLoadingProject(e) {
    console.log("Loading project:");
    const projectId = e.currentTarget.dataset.id;
    const projectObject = loadProjectById(projectId);
    createProjectInstance(projectObject);
    attachListeners();
}

// export function loadLastProject() {
//     if(localStorage.getItem("projects")[0] !== null) {
//         console.log(localStorage.getItem("projects")[0]);
//     }
// }

export function updateProjectList() {
    const projects = JSON.parse(localStorage.getItem("projects")) || [];
    const projectList = document.getElementById('grid-container-modal');
    if (projects.length === 0) { 
        projectList.textContent = "No projects to display" 
        return;
    }
    projectList.innerHTML = "";
    projects.forEach(project => {
        createProjectElement(project);
    });

    attachProjectUIListeners();
}

export function extractNewProjectForm() {
    const name = document.getElementById('project-name-input').value;
    const description = document.getElementById('project-description-input').value;
    const dueDate = document.getElementById('project-dueDate-input').value;

    const projectInfo = { name, description, dueDate };
    return projectInfo;
}