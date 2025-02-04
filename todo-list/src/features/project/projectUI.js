import { attachListeners } from "../todo/ui/TodoListeners";
import { loadProjectById } from "./projectManager";
import { createProjectElement, createProjectInstance } from "./projectRenderer";

const eventHandlers = [
        { selector: '#project', action: 'click', handler: handleLoadingProject }
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
    const projectId = e.currentTarget.dataset.id;
    const projectObject = loadProjectById(projectId);
    createProjectInstance(projectObject);
    attachListeners();
}

export function updateProjectList() {
    const projectList = document.getElementById('grid-container-modal');
    projectList.innerHTML = "";

    const projects = JSON.parse(localStorage.getItem("projects")) || [];

    projects.forEach(project => {
        createProjectElement(project);
        attachProjectUIListeners();
    });
}

export function extractNewProjectForm() {
    const name = document.getElementById('project-name-input').value;
    const desc = document.getElementById('project-desc-input').value;
    const dueDate = document.getElementById('project-dueDate-input').value;

    const projectInfo = { name, desc, dueDate };
    return projectInfo;
}